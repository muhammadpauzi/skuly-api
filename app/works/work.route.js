import express from 'express';
import { validateCreateWork } from './validators/validateCreateWork.js';
import { validateUpdateWork } from './validators/validateUpdateWork.js';
import {
    createWork,
    deleteWork,
    findWork,
    updateWork,
} from './work.controller.js';
import { verifyJwtToken } from '../../middlewares/verifyJwtToken.js';

const router = express.Router();

router.route('/').post(verifyJwtToken, validateCreateWork, createWork);
router
    .route('/:id')
    .get(verifyJwtToken, findWork)
    .put(verifyJwtToken, validateUpdateWork, updateWork)
    .delete(verifyJwtToken, deleteWork);

export default router;
