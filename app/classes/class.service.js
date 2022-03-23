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
        // get id (class id) from url
        const { id: classId } = req.params;
        const class_ = await Class.findById(classId);
        // create message for class not found
        const message = setAttributeMessage(
            responseMessages.classNotFound,
            classId
        );
        // if class not found, the errors are gonna be send to catch error
        await handleNotFound(class_, message);
        // if class found, send to client
        return successResponse(res, {
            data: class_,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const createClass = async (req, res) => {
    try {
        // get client input after validation middleware
        const { name, description } = req.body;
        // handle get unique code
        const code = await getAvalaibleCode();
        // create new class
        const newClass = await Class.create({ name, description, code });
        // and send to client
        return createdResponse(res, {
            data: newClass,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const classService = { findAllClasses, createClass, findClass };
export default classService;
