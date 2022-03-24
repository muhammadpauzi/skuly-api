import jwt from 'jsonwebtoken';
import { getEnv } from '../../../utils/index.js';

export const setCookieToken = async (res, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = jwt.sign(payload, getEnv('JWT_SECRET'), {
                expiresIn: '4d',
            });
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 345600000, // 4d (same with expiresIn jwt)
                secure: getEnv('NODE_ENV', 'development') === 'production',
            });
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
};
