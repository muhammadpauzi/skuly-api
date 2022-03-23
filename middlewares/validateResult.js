import { validationResult } from 'express-validator';
import { buildErrorsValidation } from '../utils/buildErrorsValidation.js';
import { handleError } from '../utils/handleError.js';

/**
 * Builds error for validation files
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next object
 */
const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
        }
        return next();
    } catch (err) {
        return handleError(res, {
            statusCode: 422,
            errorCode: err.code,
            errors: buildErrorsValidation(err.mapped()),
            message: err.message,
        });
    }
};

export { validateResult };
