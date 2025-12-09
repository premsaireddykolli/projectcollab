const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['owner', 'admin', 'member'],
            default: 'member'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['planning', 'active', 'on-hold', 'completed'],
        default: 'planning'
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    deadline: {
        type: Date
    },
    subdomain: {
        type: String,
        unique: true,
        sparse: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true
    }],
    files: [{
        name: String,
        originalName: String,
        size: Number,
        mimetype: String,
        path: String,
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    tasks: [{
        title: {
            type: String,
            required: true
        },
        description: String,
        status: {
            type: String,
            enum: ['todo', 'in-progress', 'done'],
            default: 'todo'
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium'
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        dueDate: Date,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    analytics: {
        views: {
            type: Number,
            default: 0
        },
        collaborations: {
            type: Number,
            default: 0
        },
        filesShared: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
