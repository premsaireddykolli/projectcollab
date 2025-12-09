const Message = require('../models/Message');

const initializeSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('joinProject', (projectId) => {
            socket.join(`project_${projectId}`);
            console.log(`Socket ${socket.id} joined project ${projectId}`);
        });

        socket.on('leaveProject', (projectId) => {
            socket.leave(`project_${projectId}`);
        });

        socket.on('sendMessage', async (data) => {
            try {
                const { projectId, content, userId } = data;

                const message = new Message({
                    project: projectId,
                    sender: userId,
                    content
                });

                await message.save();
                await message.populate('sender', 'name avatar');

                io.to(`project_${projectId}`).emit('newMessage', message);
            } catch (error) {
                console.error('Message error:', error);
            }
        });

        socket.on('typing', (data) => {
            socket.to(`project_${data.projectId}`).emit('userTyping', data);
        });

        socket.on('stopTyping', (data) => {
            socket.to(`project_${data.projectId}`).emit('userStoppedTyping', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

module.exports = { initializeSocket };
