import express from 'express';
import {
    createClass,
    deleteClass,
    findAllClasses,
    findClass,
    updateClass,
    updateClassCode,
} from './class.controller.js';
import { validateCreateClass } from './validators/validateCreateClass.js';
import { validateUpdateClass } from './validators/validateUpdateClass.js';
import { verifyJwtToken } from '../../middlewares/verifyJwtToken.js';
const router = express.Router();

router
    .route('/')
    .get(verifyJwtToken, findAllClasses)
    .post(verifyJwtToken, validateCreateClass, createClass);
router
    .route('/:id')
    .get(verifyJwtToken, findClass)
    .put(verifyJwtToken, validateUpdateClass, updateClass)
    .delete(verifyJwtToken, deleteClass);

router.put('/:id/code', updateClassCode);

export default router;
