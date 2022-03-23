import express from 'express';
import { findAllClasses } from './class.controller.js';

const router = express.Router();

router.route('/').get(findAllClasses);

export default router;
