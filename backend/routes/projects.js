const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticateToken } = require('../middleware/auth');
const { validateProject } = require('../middleware/validation');

router.get('/', authenticateToken, projectController.getAllProjects);
router.post('/', authenticateToken, validateProject, projectController.createProject);
router.get('/:id', authenticateToken, projectController.getProject);
router.put('/:id', authenticateToken, projectController.updateProject);
router.delete('/:id', authenticateToken, projectController.deleteProject);
module.exports = router;