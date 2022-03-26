import { responseMessages } from '../../constants/messages.js';
import { handleError } from '../../utils/handleError.js';
import { successResponse } from '../../utils/response.js';
import User from './user.model.js';

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

const updateProfile = async (req, res) => {
    try {
        const { id: userId } = req.user;

        let body = {};
        if (req.body && req.body.name) body.name = req.body.name;
        if (req.body && req.body.username) body.username = req.body.username;

        const updatedProfile = await User.findByIdAndUpdate(userId, body, {
            new: true,
        });

        return successResponse(res, {
            message: responseMessages.userProfileUpdated,
            data: updatedProfile,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const userService = {
    getMe,
    updateProfile,
};

export default userService;
