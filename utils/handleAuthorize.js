import { FORBIDDEN } from '../constants/statusCode.js';

export const handleAuthorize = async (primaryId, foreignId, message) => {
    return new Promise((resolve, reject) => {
        if (primaryId !== foreignId)
            return reject({
                statusCode: FORBIDDEN,
                message,
            });
        resolve(true);
    });
};
