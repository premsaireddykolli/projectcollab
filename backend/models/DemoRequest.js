const mongoose = require('mongoose');

const demoRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    organization: String,
    teamSize: String,
    message: String,
    status: {
        type: String,
        enum: ['pending', 'contacted', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DemoRequest', demoRequestSchema);
