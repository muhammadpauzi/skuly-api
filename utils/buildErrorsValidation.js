import { upperCaseFirstLetterOfSentence } from './index.js';

export const buildErrorsValidation = (validationErrors = {}) => {
    let result = {};
    for (const errorKey in validationErrors) {
        result[errorKey] = {
            value: validationErrors[errorKey].value || null,
            message: upperCaseFirstLetterOfSentence(
                validationErrors[errorKey].msg
            ),
        };
    }
    return result;
};
