import {
    CLIENT_ERROR,
    CREATED,
    SUCCESS,
    UNAUTHORIZED,
} from '../constants/statusCode.js';

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

export const notFoundResponse = (res, data = {}, statusCode = NOT_FOUND) => {
    data.success = false;
    data.statusCode = statusCode;
    return res.status(statusCode).json(data);
};

export const unauthorizedResponse = (
    res,
    data = {},
    statusCode = UNAUTHORIZED
) => {
    data.success = false;
    data.statusCode = statusCode;
    return res.status(statusCode).json(data);
};

export const clientErrorResponse = (
    res,
    data = {},
    statusCode = CLIENT_ERROR
) => {
    data.success = false;
    data.statusCode = statusCode;
    return res.status(statusCode).json(data);
};
