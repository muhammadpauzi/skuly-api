import { responseMessages } from '../../constants/messages.js';
import { handleAuthorize } from '../../utils/handleAuthorize.js';
import { handleError } from '../../utils/handleError.js';
import { handleNotFound } from '../../utils/handleNotFound.js';
import { createdResponse, successResponse } from '../../utils/response.js';
import { setAttributeMessage } from '../../utils/setAttributeMessage.js';
import { getClassById } from '../classes/helpers/getClassById.js';
import Work from './work.model.js';

// findAllWorks endpoint there in class.service

const findWork = async (req, res) => {
    try {
        const isWithTeacher = ['1', 'true'].includes(req.query.with_teacher);
        // get id (class id) from url
        const { classId = '' } = req.query;
        const { id: workId } = res.params;
        const { id: userId } = req.user;

        let class_ = await Class.findOne({
            $and: [
                {
                    _id: classId,
                },
                {
                    $or: [
                        {
                            students: { $in: [userId] },
                        },
                        {
                            teacher: userId,
                        },
                    ],
                },
            ],
        }).populate('teacher');

        const message = setAttributeMessage(
            responseMessages.classNotFound,
            classId
        );
        await handleNotFound(class_, message);

        const work = await Work.findById(class_._id).populate('author');

        class_ = class_.toJSON();
        class_.work = work;
        // if class found, send to client
        return successResponse(res, {
            data: class_,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const createWork = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { classId = '' } = req.query;

        const class_ = await getClassById(classId);
        await handleAuthorize(
            userId,
            class_.teacher.id.toString('hex'),
            responseMessages.dontHavePermissionToCreateWorkForThisClass
        );

        const { title, description, type, duedate } = req.body;

        // create new class
        const newWork = await Work.create({
            title,
            description,
            class: class_.id,
            author: userId,
            type,
            duedate,
        });
        // and send to client
        return createdResponse(res, {
            message: responseMessages.workCreated,
            data: newWork,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const updateWork = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { id: workId } = req.params;
        const { classId = '' } = req.query;

        const class_ = await getClassById(classId);
        await handleAuthorize(
            userId,
            class_.teacher.id.toString('hex'),
            responseMessages.dontHavePermissionToUpdateWorkForThisClass
        );

        let body = {};
        if (req.body && req.body.title) body.title = req.body.title;
        if (req.body && req.body.description)
            body.description = req.body.description;
        if (req.body && req.body.type) body.type = req.body.type;
        if (req.body && req.body.duedate) body.duedate = req.body.type;

        const updatedWork = await Work.findByIdAndUpdate(workId, body, {
            new: true,
        });

        const message = setAttributeMessage(
            responseMessages.workNotFound,
            workId
        );
        await handleNotFound(updatedWork, message);

        return successResponse(res, {
            message: responseMessages.workUpdated,
            data: updatedWork,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const deleteWork = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { id: workId } = req.params;
        const { classId = '' } = req.query;

        const class_ = await getClassById(classId);
        await handleAuthorize(
            userId,
            class_.teacher.id.toString('hex'),
            responseMessages.dontHavePermissionToDeleteWorkForThisClass
        );

        const work = await Work.findById(workId);
        const message = setAttributeMessage(
            responseMessages.workNotFound,
            workId
        );
        await handleNotFound(work, message);

        await work.remove();

        return successResponse(res, {
            message: responseMessages.workDeleted,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const workService = {
    createWork,
    updateWork,
    deleteWork,
};

export default workService;
