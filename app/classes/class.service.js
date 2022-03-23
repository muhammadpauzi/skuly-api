import { handleError } from '../../utils/handleError.js';
import Class from './class.model.js';

const findAllClasses = async (res) => {
    try {
        const classes = await Class.find().sort({ createdAt: 1 });
        return res
            .status(200)
            .json({ success: true, statusCode: 200, data: classes });
    } catch (error) {
        handleError(error);
    }
};

const classService = { findAllClasses };
export default classService;
