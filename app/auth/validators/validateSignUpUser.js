import { validateResult } from '../../../middlewares/validateResult.js';
import { check } from 'express-validator';
import User from '../../users/user.model.js';
import { inputsValidationMessages } from '../../../constants/messages.js';

const validateSignUpUser = [
    check('username')
        .not()
        .isEmpty()
        .withMessage(inputsValidationMessages.usernameRequired)
        .isAlphanumeric()
        .withMessage(inputsValidationMessages.usernameAlphaNum)
        .custom(async (usernameInput) => {
            const user = await User.findOne({ username: usernameInput.trim() });
            if (user)
                throw new Error(
                    inputsValidationMessages.usernameAlreadyRegistered
                );
        })
        .trim(),
    check('password')
        .not()
        .isEmpty()
        .withMessage(inputsValidationMessages.passwordRequired)
        .trim(),
    check('email')
        .not()
        .isEmpty()
        .withMessage(inputsValidationMessages.emailRequired)
        .isEmail()
        .withMessage(inputsValidationMessages.emailNotValid)
        .custom(async (emailInput) => {
            const user = await User.findOne({ email: emailInput.trim() });
            if (user)
                throw new Error(
                    inputsValidationMessages.emailAlreadyRegistered
                );
        })
        .normalizeEmail({ all_lowercase: true })
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateSignUpUser };
