import { validateResult } from '../../../middlewares/validateResult.js';
import { check } from 'express-validator';
import User from '../user.model.js';
import { inputsValidationMessages } from '../../../constants/messages.js';

const validateUpdateProfile = [
    check('name').trim(),
    check('username')
        .isAlphanumeric()
        .withMessage(inputsValidationMessages.usernameAlphaNum)
        .custom(async (usernameInput, { req: { user: loggedInUser } }) => {
            const user = await User.findOne({ username: usernameInput.trim() });
            if (user && user.id !== loggedInUser.id)
                throw new Error(
                    inputsValidationMessages.usernameAlreadyRegistered
                );
        })
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateUpdateProfile };
