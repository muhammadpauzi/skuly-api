import { handleError } from '../../utils/handleError.js';
import { createdResponse, successResponse } from '../../utils/response.js';
import Class from './class.model.js';
import { getAvalaibleCode } from './helpers/getAvalaibleCode.js';

const findAllClasses = async (res) => {
    try {
        const classes = await Class.find().sort({ createdAt: -1 });
        return successResponse(res, {
            data: classes,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const createClass = async (req, res) => {
    try {
        const { name, description } = req.body;
        const code = await getAvalaibleCode();
        const newClass = await Class.create({ name, description, code });
        return createdResponse(res, {
            data: newClass,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const classService = { findAllClasses, createClass };
export default classService;
