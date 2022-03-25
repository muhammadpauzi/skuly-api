import userService from './user.service.js';

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Get data from logged in user (current user)
 * @method GET
 * @access Private
 */
export const getMe = async (req, res) => {
    return await userService.getMe(req, res);
};
