import { setAttributeMessage } from '../../utils/setAttributeMessage.js';
import { handleError } from '../../utils/handleError.js';
import {
    clientErrorResponse,
    createdResponse,
    successResponse,
} from '../../utils/response.js';
import Class from './class.model.js';
import { getAvalaibleCode } from './helpers/getAvalaibleCode.js';
import { handleNotFound } from '../../utils/handleNotFound.js';
import { responseMessages } from '../../constants/messages.js';
import { FORBIDDEN } from '../../constants/statusCode.js';
import { handleAuthorize } from '../../utils/handleAuthorize.js';
import Work from '../works/work.model.js';
import { getClassById } from './helpers/getClassById.js';

// TODO: change findAllClasses to findAllMyClassc
// TODO: add endpoint to get joined class
const findAllMyClasses = async (req, res) => {
    try {
        const isWithTeacher = ['1', 'true'].includes(req.query.with_teacher);
        const { id: userId } = req.user;
        let classes;
        if (isWithTeacher) {
            classes = await Class.find({ teacher: userId })
                .sort({ createdAt: -1 })
                .populate('teacher');
        } else {
            classes = await Class.find({ teacher: userId }).sort({
                createdAt: -1,
            });
        }

        return successResponse(res, {
            data: classes,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const findAllMyJoinedClasses = async (req, res) => {
    try {
        const isWithTeacher = ['1', 'true'].includes(req.query.with_teacher);
        const { id: userId } = req.user;

        let classes;
        if (isWithTeacher) {
            classes = await Class.find({ students: { $in: [userId] } })
                .sort({ createdAt: -1 })
                .populate('teacher');
        } else {
            classes = await Class.find({ students: { $in: [userId] } }).sort({
                createdAt: -1,
            });
        }

        return successResponse(res, {
            data: classes,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const findAllClasses = async (req, res) => {
    try {
        const isWithTeacher = ['1', 'true'].includes(req.query.with_teacher);
        let classes;
        if (isWithTeacher) {
            classes = await Class.find()
                .sort({ createdAt: -1 })
                .populate('teacher');
        } else {
            classes = await Class.find().sort({ createdAt: -1 });
        }

        return successResponse(res, {
            data: classes,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const findClass = async (req, res) => {
    try {
        const isWithTeacher = ['1', 'true'].includes(req.query.with_teacher);
        // get id (class id) from url
        const { id: classId } = req.params;
        const { id: userId } = req.user;

        let class_;
        if (isWithTeacher) {
            class_ = await Class.findOne({
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
        } else {
            class_ = await Class.findOne({
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
            });
        }

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
        console.log(req.user);
        const { id: userId } = req.user;
        // get client input after validation middleware
        const { name, description } = req.body;
        // handle get unique code
        const code = await getAvalaibleCode();
        const students = [];
        const teacher = userId;
        // create new class
        const newClass = await Class.create({
            name,
            description,
            code,
            students,
            teacher,
        });
        // and send to client
        return createdResponse(res, {
            message: responseMessages.classCreated,
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
        const { id: userId } = req.user;
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

        await handleAuthorize(
            userId,
            updatedClass.teacher.id.toString('hex'),
            responseMessages.dontHavePermissionToUpdateClass
        );

        // and send to client
        return successResponse(res, {
            message: responseMessages.classUpdated,
            data: updatedClass,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const updateClassCode = async (req, res) => {
    try {
        const { id: classId } = req.params;
        const { id: userId } = req.user;
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
        await handleAuthorize(
            userId,
            updatedClassCode.teacher.id.toString('hex'),
            responseMessages.dontHavePermissionToUpdateClass
        );

        return successResponse(res, {
            message: responseMessages.classCodeUpdated,
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
        const { id: userId } = req.user;
        const class_ = await getClassById(classId);
        await handleAuthorize(
            userId,
            class_.teacher.id.toString('hex'),
            responseMessages.dontHavePermissionToDeleteClass
        );

        // delete class
        class_.remove();
        // and send to client
        return successResponse(res, {
            message: responseMessages.classDeleted,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const joinStudentByCode = async (req, res) => {
    try {
        const { user } = req;
        const { code } = req.query;

        const class_ = await Class.findOne({ code });

        const message = setAttributeMessage(
            responseMessages.classCodeNotExist,
            code
        );
        await handleNotFound(class_, message);

        if (user.id === class_.teacher.id.toString('hex'))
            return clientErrorResponse(
                res,
                {
                    message: responseMessages.cannotJoinTheClass,
                },
                FORBIDDEN
            );

        const hasJoined = class_.students.includes(user.id);
        if (hasJoined)
            return clientErrorResponse(
                res,
                {
                    message: setAttributeMessage(
                        responseMessages.alreadyJoined,
                        code
                    ),
                },
                FORBIDDEN
            );

        class_.students.push(user);
        await class_.save();

        return successResponse(res, {
            message: responseMessages.studentJoined,
            _id: class_._id,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const findAllClassWorks = async (req, res) => {
    try {
        const { id: classId } = req.params;
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

        const works = await Work.find({ class: class_._id }).sort({
            createdAt: -1,
        });

        class_ = class_.toJSON();
        class_.works = works;

        return successResponse(res, {
            data: class_,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const classService = {
    findAllMyClasses,
    findAllMyJoinedClasses,
    findAllClasses,
    createClass,
    findClass,
    updateClass,
    deleteClass,
    updateClassCode,
    joinStudentByCode,
    findAllClassWorks,
};
export default classService;
