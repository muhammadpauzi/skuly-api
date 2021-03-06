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

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Find a work by class id and work id
 * @method GET
 * @access Private
 */
export const findWork = async (req, res) => {
    return await workService.findWork(req, res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Get all types of work
 * @method GET
 * @access Private
 */
export const findTypes = async (req, res) => {
    return await workService.findTypes(req, res);
};
