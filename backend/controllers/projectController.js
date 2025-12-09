const Project = require('../models/Project');
const User = require('../models/User');
const Activity = require('../models/Activity');

exports.getAllProjects = async (req, res) => {
    try {
        const { search, status, limit = 10, page = 1 } = req.query;

        let query = {
            $or: [
                { owner: req.user._id },
                { 'members.user': req.user._id }
            ]
        };

        if (search) {
            query.$and = [
                {
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } }
                    ]
                }
            ];
        }

        if (status) {
            query.status = status;
        }

        const projects = await Project.find(query)
            .populate('owner', 'name email avatar')
            .populate('members.user', 'name email avatar')
            .sort({ updatedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Project.countDocuments(query);

        res.json({
            projects,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProject = async (req, res) => {
    try {
        const { title, description, deadline, tags } = req.body;

        let subdomain = title.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

        let counter = 1;
        let originalSubdomain = subdomain;
        while (await Project.findOne({ subdomain })) {
            subdomain = `${originalSubdomain}-${counter}`;
            counter++;
        }

        const project = new Project({
            title,
            description,
            deadline,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            subdomain,
            owner: req.user._id,
            members: [{
                user: req.user._id,
                role: 'owner'
            }]
        });

        await project.save();
        await User.findByIdAndUpdate(req.user._id, { $push: { projects: project._id } });

        await new Activity({
            project: project._id,
            user: req.user._id,
            type: 'project_update',
            message: `${req.user.name} created project "${title}"`
        }).save();

        await project.populate('owner', 'name email avatar');

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('owner', 'name email avatar')
            .populate('members.user', 'name email avatar')
            .populate('tasks.assignedTo', 'name email avatar')
            .populate('files.uploadedBy', 'name email avatar');

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const hasAccess = project.isPublic ||
            project.owner.toString() === req.user._id.toString() ||
            project.members.some(member => member.user._id.toString() === req.user._id.toString());

        if (!hasAccess) {
            return res.status(403).json({ error: 'Access denied' });
        }

        await Project.findByIdAndUpdate(req.params.id, { $inc: { 'analytics.views': 1 } });

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const isOwner = project.owner.toString() === req.user._id.toString();
        if (!isOwner) {
            return res.status(403).json({ error: 'Only owner can update project' });
        }

        Object.assign(project, req.body);
        await project.save();

        await project.populate('owner', 'name email avatar');

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const isOwner = project.owner.toString() === req.user._id.toString();
        if (!isOwner) {
            return res.status(403).json({ error: 'Only owner can delete project' });
        }

        await Project.findByIdAndDelete(req.params.id);
        await User.findByIdAndUpdate(req.user._id, { $pull: { projects: req.params.id } });

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
