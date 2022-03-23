import { NOT_FOUND } from '../constants/statusCode.js';

export const handleNotFound = (document, message = '') => {
    return new Promise((resolve, reject) => {
        if (!document) return reject({ statusCode: NOT_FOUND, message });
        resolve(true);
    });
};
