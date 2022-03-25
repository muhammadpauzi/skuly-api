import { handleError } from '../../utils/handleError.js';
import { successResponse } from '../../utils/response.js';

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

const userService = {
    getMe,
};

export default userService;
