import express from 'express';
import { createClass, findAllClasses } from './class.controller.js';
import { validateCreateClass } from './validators/validateCreateClass.js';

const router = express.Router();

router.route('/').get(findAllClasses).post(validateCreateClass, createClass);

export default router;
