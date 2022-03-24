import { authMessages } from '../../constants/messages.js';
import { handleError } from '../../utils/handleError.js';
import { createdResponse } from '../../utils/response.js';
import User from '../users/user.model.js';
import { hashPassword } from './helpers/hashPassword.js';

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        return createdResponse(res, {
            data: newClass,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const signUp = async (req, res) => {
    try {
        let { username, password, email } = req.body;
        password = await hashPassword(password);
        const { password, ...user } = await User.create({
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

const authService = {
    signIn,
    signUp,
};

export default authService;
