import { authMessages } from '../../constants/messages.js';
import { handleError } from '../../utils/handleError.js';
import {
    createdResponse,
    successResponse,
    unauthorizedResponse,
} from '../../utils/response.js';
import User from '../users/user.model.js';
import { comparePassword } from './helpers/comparePassword.js';
import { hashPassword } from './helpers/hashPassword.js';
import { setCookieToken } from './helpers/setCookieToken.js';

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            username,
        });

        if (user) {
            const isValid = await comparePassword(password, user.password);
            if (isValid) {
                const token = await setCookieToken(res, {
                    id: user.id,
                    username: user.username,
                });
                return createdResponse(res, {
                    message: authMessages.userLoggedIn,
                    token,
                    data: user,
                });
            }
        }
        return unauthorizedResponse(res, { message: authMessages.failed });
    } catch (error) {
        handleError(res, error);
    }
};

const signUp = async (req, res) => {
    try {
        let { username, password, email } = req.body;
        password = await hashPassword(password);
        const user = await User.create({
            name: username,
            username,
            password,
            email,
        });
        return createdResponse(res, {
            message: authMessages.userRegistered,
            data: user,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const getMe = async (req, res) => {
    try {
        const user = req.user;
        return successResponse(res, {
            data: user,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const authService = {
    signIn,
    signUp,
    getMe,
};

export default authService;
