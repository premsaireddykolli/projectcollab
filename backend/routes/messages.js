const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authenticateToken } = require('../middleware/auth');

router.get('/:projectId', authenticateToken, messageController.getMessages);
router.post('/:projectId', authenticateToken, messageController.createMessage);

module.exports = router;
