import bcryptjs from 'bcryptjs';

export const hashPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcryptjs.genSalt();
            const hashedPassword = bcryptjs.hash(password, salt);
            resolve(hashedPassword);
        } catch (error) {
            reject(error);
        }
    });
};
