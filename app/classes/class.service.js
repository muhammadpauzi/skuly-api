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

// TODO: handle policy when update class (req.user.id === class.userId)
// TODO: handle is id (class id) valid
const updateClass = async (req, res) => {
    try {
        // get id (class id) from url
        const { id: classId } = req.params;
        // TODO: refactor this code
        let body = {};
        if (req.body && req.body.name) body.name = req.body.name;
        if (req.body && req.body.description)
            body.description = req.body.description;
        // update class by id  and return the updated class
        const updatedClass = await Class.findByIdAndUpdate(classId, body, {
            new: true,
        });

        const message = setAttributeMessage(
            responseMessages.classNotFound,
            classId
        );
        await handleNotFound(updatedClass, message);

        // and send to client
        return successResponse(res, {
            data: updatedClass,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const updateClassCode = async (req, res) => {
    try {
        const { id: classId } = req.params;
        const avalaibleCode = await getAvalaibleCode();

        const updatedClassCode = await Class.findByIdAndUpdate(
            classId,
            { code: avalaibleCode },
            {
                new: true,
            }
        );

        const message = setAttributeMessage(
            responseMessages.classNotFound,
            classId
        );
        await handleNotFound(updatedClassCode, message);

        return successResponse(res, {
            data: {
                _id: updatedClassCode.id,
                code: updatedClassCode.code,
            },
        });
    } catch (error) {
        handleError(res, error);
    }
};

const deleteClass = async (req, res) => {
    try {
        // get id (class id) from url
        const { id: classId } = req.params;
        // update class by id  and return the updated class
        const class_ = await Class.findById(classId);
        // create message for class not found
        const message = setAttributeMessage(
            responseMessages.classNotFound,
            classId
        );
        // if class not found, the errors are gonna be send to catch error
        await handleNotFound(class_, message);
        // delete class
        class_.remove();
        // and send to client
        return successResponse(res, {});
    } catch (error) {
        handleError(res, error);
    }
};

const classService = {
    findAllClasses,
    createClass,
    findClass,
    updateClass,
    deleteClass,
    updateClassCode,
};
export default classService;
