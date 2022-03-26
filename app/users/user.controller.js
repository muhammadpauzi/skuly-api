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

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Update profile
 * @method PUT
 * @access Private
 */
export const updateProfile = async (req, res) => {
    return await userService.updateProfile(req, res);
};
