import express from 'express';
import { getAboutMe, updateAboutMe } from '../controllers/aboutController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getAboutMe)
  .put(protect, admin, updateAboutMe);

export default router; 