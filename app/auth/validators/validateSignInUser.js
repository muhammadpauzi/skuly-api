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
};

const validateSignInUser = [
    check('username')
        .not()
        .isEmpty()
        .withMessage(messages.usernameRequired)
        .trim(),
    check('password')
        .not()
        .isEmpty()
        .withMessage(messages.passwordRequired)
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateSignInUser };
