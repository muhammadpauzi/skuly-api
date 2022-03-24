import bcryptjs from 'bcryptjs';

export const comparePassword = async (password, hashedPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isSame = bcryptjs.compare(password, hashedPassword);
            resolve(isSame);
        } catch (error) {
            reject(error);
        }
    });
};
