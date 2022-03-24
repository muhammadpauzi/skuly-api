import { validateResult } from '../../../middlewares/validateResult.js';
import { check } from 'express-validator';
import { setAttributeMessage } from '../../../utils/setAttributeMessage.js';
import { validationMessages } from '../../../constants/messages.js';
import User from '../../users/user.model.js';

const messages = {
    usernameRequired: setAttributeMessage(
        validationMessages.required,
        'username'
    ),
    passwordRequired: setAttributeMessage(
        validationMessages.required,
        'password'
    ),
    emailRequired: setAttributeMessage(validationMessages.required, 'email'),
    emailNotValid: setAttributeMessage(validationMessages.email, 'email'),
    emailAlreadyRegistered: setAttributeMessage(
        validationMessages.alreadyRegistered,
        'email'
    ),
    usernameAlreadyRegistered: setAttributeMessage(
        validationMessages.alreadyRegistered,
        'username'
    ),
    usernameAlphaNum: setAttributeMessage(
        validationMessages.alphaNum,
        'username'
    ),
};

const validateSignUpUser = [
    check('username')
        .not()
        .isEmpty()
        .withMessage(messages.usernameRequired)
        .isAlphanumeric()
        .withMessage(messages.usernameAlphaNum)
        .custom(async (usernameInput) => {
            const user = await User.findOne({ username: usernameInput.trim() });
            if (user) throw new Error(messages.usernameAlreadyRegistered);
        })
        .trim(),
    check('password')
        .not()
        .isEmpty()
        .withMessage(messages.passwordRequired)
        .trim(),
    check('email')
        .not()
        .isEmpty()
        .withMessage(messages.emailRequired)
        .isEmail()
        .withMessage(messages.emailNotValid)
        .custom(async (emailInput) => {
            const user = await User.findOne({ email: emailInput.trim() });
            if (user) throw new Error(messages.emailAlreadyRegistered);
        })
        .normalizeEmail({ all_lowercase: true })
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateSignUpUser };
