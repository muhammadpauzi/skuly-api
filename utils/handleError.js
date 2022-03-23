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

    const statusCode = err.statusCode || 500;
    const errorCode = err.errorCode || null;
    const errorMessage =
        typeof err.message === 'string' && err.message !== ''
            ? err.message
            : null;

    res.status(statusCode).json({
        success: false,
        statusCode,
        errorCode,
        errorMessage,
        errors: err.errors,
    });
};
