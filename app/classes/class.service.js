import { handleError } from '../../utils/handleError.js';
import Class from './class.model.js';

const findAllClasses = async (res) => {
    try {
        const classes = await Class.find().sort({ createdAt: 1 });
        return res
            .status(200)
            .json({ success: true, statusCode: 200, data: classes });
    } catch (error) {
        handleError(res, error);
    }
};

const createClass = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newClass = await Class.create({ name, description });
        return res
            .status(201)
            .json({ success: true, statusCode: 201, data: newClass });
    } catch (error) {
        handleError(res, error);
    }
};

const classService = { findAllClasses, createClass };
export default classService;
