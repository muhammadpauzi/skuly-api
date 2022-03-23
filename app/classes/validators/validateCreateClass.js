import { validateResult } from '../../../middlewares/validateResult.js';
import { check } from 'express-validator';

/**
 * Validates create new item request
 */
const validateCreateClass = [
    check('name')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateCreateClass };
