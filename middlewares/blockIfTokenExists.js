import { authMessages } from '../constants/messages.js';
import { FORBIDDEN } from '../constants/statusCode.js';
import jwt from 'jsonwebtoken';
import { getEnv } from '../utils/index.js';
import { clientErrorResponse } from '../utils/response.js';
import User from '../app/users/user.model.js';
import { handleError } from '../utils/handleError.js';

export const blockIfTokenExists = async (req, res, next) => {
    if (!req.cookies.token) return next();

    // if token exists
    const { token } = req.cookies;
    try {
        const { id } = jwt.verify(token, getEnv('JWT_SECRET'));
        const user = await User.findById(id);

        if (user)
            return clientErrorResponse(
                res,
                {
                    message: authMessages.hasLoggedIn,
                },
                FORBIDDEN
            );

        return next(); // if user not found with the id and username
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) return next();
        return handleError(res, error);
    }
};
