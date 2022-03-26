import { responseMessages } from '../../../constants/messages.js';
import { handleNotFound } from '../../../utils/handleNotFound.js';
import { setAttributeMessage } from '../../../utils/setAttributeMessage.js';
import Class from '../class.model.js';

export const getClassById = async (classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const class_ = await Class.findById(classId);

            // create message for class not found
            const message = setAttributeMessage(
                responseMessages.classNotFound,
                classId
            );
            // if class not found, the errors are gonna be send to catch error
            await handleNotFound(class_, message);
            resolve(class_);
        } catch (error) {
            reject(error);
        }
    });
};
