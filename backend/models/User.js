const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String,
        sparse: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['student', 'institution', 'industry', 'admin'],
        default: 'student'
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    lastActive: {
        type: Date,
        default: Date.now
    },
    preferences: {
        theme: {
            type: String,
            default: 'light'
        },
        notifications: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
