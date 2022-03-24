import jwt from 'jsonwebtoken';
import { getEnv } from '../../../utils/index.js';

export const setCookieToken = async (res, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = jwt.sign(payload, getEnv('JWT_SECRET'), {
                expiresIn: '4d',
            });
            res.cookie('token', token);
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
};
