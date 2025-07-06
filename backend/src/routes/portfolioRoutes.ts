import express from 'express';
import { getProjects, addProject, getSkills, addSkill } from '../controllers/portfolioController';
import { authMiddleware } from '../middleware/authMiddleware';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get('/projects', getProjects);
router.post('/projects', authMiddleware, upload.single('image'), addProject);
router.get('/skills', getSkills);
router.post('/skills', authMiddleware, addSkill);

export default router;