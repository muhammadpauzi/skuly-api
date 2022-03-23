import { setAttributeMessage } from '../../utils/setAttributeMessage.js';
import { handleError } from '../../utils/handleError.js';
import { createdResponse, successResponse } from '../../utils/response.js';
import Class from './class.model.js';
import { getAvalaibleCode } from './helpers/getAvalaibleCode.js';
import { handleNotFound } from '../../utils/handleNotFound.js';
import { responseMessages } from '../../constants/messages.js';

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

const findClass = async (req, res) => {
    try {
        const { id: classId } = req.params;
        const class_ = await Class.findById(classId);
        const message = setAttributeMessage(
            responseMessages.classNotFound,
            classId
        );
        await handleNotFound(class_, message);
        return successResponse(res, {
            data: class_,
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

const classService = { findAllClasses, createClass, findClass };
export default classService;
