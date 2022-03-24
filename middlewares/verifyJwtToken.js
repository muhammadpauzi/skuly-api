import { authMessages } from '../constants/messages.js';
import { handleError } from '../utils/handleError.js';

export const verifyJwtToken = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const { id } = jwt.verify(token, getEnv('JWT_SECRET'));
            req.user = await User.findById(id).select('-password');
            return next();
        } catch (error) {
            return handleError(res, {
                statusCode: 401,
                message: authMessages.tokenNotValid,
                ...error,
            });
        }
    }

    return handleError(res, {
        statusCode: 401,
        message: authMessages.noToken,
    });
};
