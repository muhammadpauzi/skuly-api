import classService from './class.service.js';

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Find all classes
 * @method GET
 * @access Private
 */
export const findAllClasses = async (req, res) => {
    return await classService.findAllClasses(req, res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Find one class by id
 * @method GET
 * @access Private
 */
export const findClass = async (req, res) => {
    return await classService.findClass(req, res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Create a class
 * @method POST
 * @access Private
 */
export const createClass = async (req, res) => {
    return await classService.createClass(req, res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Update class
 * @method PUT
 * @access Private
 */
export const updateClass = async (req, res) => {
    return await classService.updateClass(req, res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Delete class by id
 * @method DELETE
 * @access Private
 */
export const deleteClass = async (req, res) => {
    return await classService.deleteClass(req, res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Update class code by id
 * @method PUT
 * @access Private
 */
export const updateClassCode = async (req, res) => {
    return await classService.updateClassCode(req, res);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @desc Update class code by id
 * @method PUT
 * @access Private
 */
export const joinStudentByCode = async (req, res) => {
    return await classService.joinStudentByCode(req, res);
};
