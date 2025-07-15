import express from 'express';
import {
  getProjects,
  addProject,
  getProjectById,
  updateProject,
  deleteProject,
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  submitContact,
} from '../controllers/portfolioController';
import { authMiddleware } from '../middleware/authMiddleware';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Project routes
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', authMiddleware, upload.single('image'), addProject);
router.put('/projects/:id', authMiddleware, upload.single('image'), updateProject);
router.delete('/projects/:id', authMiddleware, deleteProject);

// Skill routes
router.get('/skills', getSkills);
router.post('/skills', authMiddleware, addSkill);
router.put('/skills/:id', authMiddleware, updateSkill);
router.delete('/skills/:id', authMiddleware, deleteSkill);

// Contact route
router.post('/contact', submitContact);

export default router;