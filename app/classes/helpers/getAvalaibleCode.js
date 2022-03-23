import { randomString } from '../../../utils/index.js';
import Class from '../class.model.js';

export const getAvalaibleCode = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let code = await randomString();
            while (true) {
                const class_ = await Class.findOne({ code });
                if (!class_) break;
                code = await randomString();
            }
            return resolve(code);
        } catch (error) {
            return reject(error);
        }
    });
};
