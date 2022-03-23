import { isDevelopment } from './index.js';
import { errorLog } from './log.js';

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
export const handleError = (res = {}, err = {}) => {
    // Prints error in console
    if (isDevelopment()) {
        errorLog(err);
    }
    console.log(err.errors);
    // Sends error to user
    res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        errorCode: err.errorCode,
        errorMessage:
            typeof err.message === 'string' && err.message !== ''
                ? err.message
                : null,
        errors: err.errors,
    });
};
