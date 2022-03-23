import { CREATED, SUCCESS } from '../constants/statusCode.js';

export const createdResponse = (res, data = {}) => {
    data.success = true;
    data.statusCode = CREATED;
    return res.status(CREATED).json(data);
};

export const successResponse = (res, data = {}, statusCode = SUCCESS) => {
    data.success = true;
    data.statusCode = statusCode;
    return res.status(statusCode).json(data);
};
