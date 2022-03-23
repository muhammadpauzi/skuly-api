import { validateResult } from '../../../middlewares/validateResult.js';
import { check } from 'express-validator';
import { setAttributeMessage } from '../../../utils/setAttributeMessage.js';
import { validationMessages } from '../../../constants/messages.js';

const { nameRequired } = {
    nameRequired: setAttributeMessage(validationMessages.required, 'name'),
};

const validateCreateClass = [
    check('name')
        .exists()
        .withMessage(nameRequired)
        .not()
        .isEmpty()
        .withMessage(nameRequired)
        .trim(),
    check('description').trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export { validateCreateClass };
