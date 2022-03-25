import express from 'express';
import {
    findAllMyClasses,
    createClass,
    deleteClass,
    findAllClasses,
    findClass,
    joinStudentByCode,
    updateClass,
    updateClassCode,
    findAllMyJoinedClasses,
    findAllClassWorks,
} from './class.controller.js';
import { validateCreateClass } from './validators/validateCreateClass.js';
import { validateUpdateClass } from './validators/validateUpdateClass.js';
import { verifyJwtToken } from '../../middlewares/verifyJwtToken.js';
import { isDevelopment } from '../../utils/index.js';
const router = express.Router();

router.route('/').post(verifyJwtToken, validateCreateClass, createClass);
router.get('/me', verifyJwtToken, findAllMyClasses);
router.get('/joined', verifyJwtToken, findAllMyJoinedClasses);

isDevelopment() && router.get('/', verifyJwtToken, findAllClasses);

router
    .route('/:id')
    .get(verifyJwtToken, findClass)
    .put(verifyJwtToken, validateUpdateClass, updateClass)
    .delete(verifyJwtToken, deleteClass);

router.get('/:id/join', verifyJwtToken, joinStudentByCode);
router.put('/:id/code', verifyJwtToken, updateClassCode);
router.get('/:id/works', verifyJwtToken, findAllClassWorks);

export default router;
