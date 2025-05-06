import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject
} from '../controllers/projectController';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, admin, addProject);

router.route('/:id')
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

export default router; 