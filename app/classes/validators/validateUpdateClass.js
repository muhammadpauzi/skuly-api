import { validateResult } from '../../../middlewares/validateResult.js';
import { check } from 'express-validator';

const validateUpdateClass = [
    check('name').trim(),
    check('description').trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateUpdateClass };
