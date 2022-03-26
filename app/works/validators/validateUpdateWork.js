import { validateResult } from '../../../middlewares/validateResult.js';
import { check } from 'express-validator';
import { inputsValidationMessages } from '../../../constants/messages.js';
import { ENUM_TYPES } from '../work.model.js';

const validateUpdateWork = [
    check('classId')
        .not()
        .isEmpty()
        .withMessage(inputsValidationMessages.classIdRequired)
        .trim(),
    check('title').trim(),
    check('description').trim(),
    check('type')
        .isIn(ENUM_TYPES)
        .withMessage(inputsValidationMessages.typeNotValid)
        .trim(),
    check('duedate').trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateUpdateWork };
