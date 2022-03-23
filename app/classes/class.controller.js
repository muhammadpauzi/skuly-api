import classService from './class.service.js';

/**
 *
 * @param {Object} _ (req)
 * @param {Object} res
 * @desc Find all classes
 * @method GET
 * @access Private
 */
export const findAllClasses = async (_, res) => {
    return await classService.findAllClasses(res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Find all classes
 * @method GET
 * @access Private
 */
export const createClass = async (req, res) => {
    return await classService.createClass(req, res);
};
