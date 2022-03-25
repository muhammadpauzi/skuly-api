import express from 'express';
import { classRouter } from '../../app/classes/index.js';
import { authRouter } from '../../app/auth/index.js';
import { workRouter } from '../../app/works/index.js';

const router = express.Router();

// classes base route
router.use(`/v1/classes`, classRouter);
router.use(`/v1/auth`, authRouter);
router.use(`/v1/works`, workRouter);

export default router;
