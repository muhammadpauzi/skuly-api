import express from 'express';
import {
    createClass,
    deleteClass,
    findAllClasses,
    findClass,
    updateClass,
} from './class.controller.js';
import { validateCreateClass } from './validators/validateCreateClass.js';
import { validateUpdateClass } from './validators/validateUpdateClass.js';

const router = express.Router();

router.route('/').get(findAllClasses).post(validateCreateClass, createClass);
router
    .route('/:id')
    .get(findClass)
    .put(validateUpdateClass, updateClass)
    .delete(deleteClass);

export default router;
