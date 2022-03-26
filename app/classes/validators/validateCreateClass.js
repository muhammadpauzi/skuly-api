import { validateResult } from '../../../middlewares/validateResult.js';
import { check } from 'express-validator';
import {
    inputsValidationMessages,
    validationMessages,
} from '../../../constants/messages.js';

const validateCreateClass = [
    check('name')
        .not()
        .isEmpty()
        .withMessage(inputsValidationMessages.nameRequired)
        .trim(),
    check('description').trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateCreateClass };
