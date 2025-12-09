const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['file_upload', 'task_complete', 'member_join', 'comment', 'project_update'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    data: mongoose.Schema.Types.Mixed
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);
