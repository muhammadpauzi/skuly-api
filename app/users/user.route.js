import express from 'express';
import { verifyJwtToken } from '../../middlewares/verifyJwtToken.js';
import { getMe, updateProfile } from './user.controller.js';
import { validateUpdateProfile } from './validators/validateUpdateProfile.js';

const router = express.Router();

router.get('/me', verifyJwtToken, getMe);
router.put(
    '/update-profile',
    verifyJwtToken,
    validateUpdateProfile,
    updateProfile
);

export default router;
