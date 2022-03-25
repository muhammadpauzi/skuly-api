import express from 'express';
import { verifyJwtToken } from '../../middlewares/verifyJwtToken.js';
import { getMe } from './user.controller.js';

const router = express.Router();

router.get('/me', verifyJwtToken, getMe);

export default router;
