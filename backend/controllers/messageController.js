const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const { projectId } = req.params;

        const messages = await Message.find({ project: projectId })
            .populate('sender', 'name avatar')
            .sort({ createdAt: 1 })
            .limit(100);

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createMessage = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { content } = req.body;

        const message = new Message({
            project: projectId,
            sender: req.user._id,
            content
        });

        await message.save();
        await message.populate('sender', 'name avatar');

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
