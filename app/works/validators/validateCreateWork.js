import { validateResult } from '../../../middlewares/validateResult.js';
import { check } from 'express-validator';
import { inputsValidationMessages } from '../../../constants/messages.js';
import { ENUM_TYPES } from '../work.model.js';

const validateCreateWork = [
    check('classId')
        .not()
        .isEmpty()
        .withMessage(inputsValidationMessages.classIdRequired)
        .trim(),
    check('title')
        .not()
        .isEmpty()
        .withMessage(inputsValidationMessages.titleRequired)
        .trim(),
    check('description').trim(),
    check('type')
        .not()
        .isEmpty()
        .withMessage(inputsValidationMessages.typeRequired)
        .isIn(ENUM_TYPES)
        .withMessage(inputsValidationMessages.typeNotValid)
        .trim(),
    check('duedate')
        // .custom((duedateInput) => {
        //     if (duedateInput && !isDate(duedateInput)) {
        //         throw new Error(inputsValidationMessages.dueDateNotValid);
        //     }
        // })
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateCreateWork };
