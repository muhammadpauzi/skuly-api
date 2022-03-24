import { authMessages } from '../constants/messages.js';
import { handleError } from '../utils/handleError.js';
import jwt from 'jsonwebtoken';
import { getEnv } from '../utils/index.js';
import User from '../app/users/user.model.js';

export const verifyJwtToken = async (req, res, next) => {
    const { token } = req.cookies;

    if (token) {
        try {
            const { id } = jwt.verify(token, getEnv('JWT_SECRET'));
            req.user = await User.findById(id).select('-password');
            return next();
        } catch (error) {
            if (
                error instanceof jwt.JsonWebTokenError ||
                error instanceof jwt.TokenExpiredError
            )
                return handleError(res, {
                    statusCode: 401,
                    message: authMessages.tokenNotValid,
                });

            return handleError(res, error);
        }
    }

    return handleError(res, {
        statusCode: 401,
        message: authMessages.noToken,
    });
};
