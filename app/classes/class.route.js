import express from 'express';
import { createClass, findAllClasses } from './class.controller.js';

const router = express.Router();

router.route('/').get(findAllClasses).post(createClass);

export default router;
