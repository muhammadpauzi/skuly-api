import express from 'express';
import { createClass, findAllClasses, findClass } from './class.controller.js';
import { validateCreateClass } from './validators/validateCreateClass.js';

const router = express.Router();

router.route('/').get(findAllClasses).post(validateCreateClass, createClass);
router.route('/:id').get(findClass);

export default router;
