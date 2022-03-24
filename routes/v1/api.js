import express from 'express';
import { classRouter } from '../../app/classes/index.js';
import { authRouter } from '../../app/auth/index.js';

const router = express.Router();

// classes base route
router.use(`/v1/classes`, classRouter);
router.use(`/v1/auth`, authRouter);

export default router;
