import { validateResult } from '../../../middlewares/validateResult.js';
import { check } from 'express-validator';
import { inputsValidationMessages } from '../../../constants/messages.js';

const validateSignInUser = [
    check('username')
        .not()
        .isEmpty()
        .withMessage(inputsValidationMessages.usernameRequired)
        .trim(),
    check('password')
        .not()
        .isEmpty()
        .withMessage(inputsValidationMessages.passwordRequired)
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateSignInUser };
