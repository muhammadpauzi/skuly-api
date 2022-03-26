import express from 'express';
import { validateCreateWork } from './validators/validateCreateWork.js';
import { createWork, deleteWork, updateWork } from './work.controller.js';
import { verifyJwtToken } from '../../middlewares/verifyJwtToken.js';

const router = express.Router();

router.route('/').post(verifyJwtToken, validateCreateWork, createWork);
router
    .route('/:id')
    .put(verifyJwtToken, updateWork)
    .delete(verifyJwtToken, deleteWork);

export default router;
