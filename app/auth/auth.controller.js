import authService from './auth.service.js';

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Sign in user account
 * @method POST
 * @access Public
 */
export const signIn = async (req, res) => {
    return await authService.signIn(req, res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Create an user account
 * @method POST
 * @access Public
 */
export const signUp = async (req, res) => {
    return await authService.signUp(req, res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Sign out
 * @method GET
 * @access Private
 */
export const signOut = async (req, res) => {
    return await authService.signOut(req, res);
};
