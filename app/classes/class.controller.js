import classService from './class.service.js';

/**
 *
 * @param {Object} _ (req)
 * @param {Object} res
 * @desc Find all classes
 * @method GET
 * @access PUBLIC/PRIVATE
 */
export const findAllClasses = async (_, res) => {
    return await classService.findAllClasses(res);
};
