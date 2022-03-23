import express from 'express';
import {
    createClass,
    findAllClasses,
    findClass,
    updateClass,
} from './class.controller.js';
import { validateCreateClass } from './validators/validateCreateClass.js';
import { validateUpdateClass } from './validators/validateUpdateClass.js';

const router = express.Router();

router.route('/').get(findAllClasses).post(validateCreateClass, createClass);
router.route('/:id').get(findClass).put(validateUpdateClass, updateClass);

export default router;
