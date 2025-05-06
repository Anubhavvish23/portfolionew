import express from 'express';
import { loginAdmin, getAdminProfile, updateAdmin } from '../controllers/adminController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/profile', protect, admin, getAdminProfile);
router.put('/update', protect, admin, updateAdmin);

export default router;
