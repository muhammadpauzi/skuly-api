import express from 'express';
import { classRouter } from '../../app/classes/index.js';

const router = express.Router();

// classes base route
router.use(`/v1/classes`, classRouter);

export default router;
