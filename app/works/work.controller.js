import workService from './work.service.js';

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Create a work
 * @method POST
 * @access Private
 */
export const createWork = async (req, res) => {
    return await workService.createWork(req, res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Update work
 * @method PUT
 * @access Private
 */
export const updateWork = async (req, res) => {
    return await workService.updateWork(req, res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Delete work by id
 * @method DELETE
 * @access Private
 */
export const deleteWork = async (req, res) => {
    return await workService.deleteWork(req, res);
};
