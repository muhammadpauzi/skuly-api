import { setAttributeMessage } from '../utils/setAttributeMessage.js';

export const responseMessages = {
    // class - error
    classNotFound: 'The class with the id `:attribute` not found.',
    classCodeNotExist: 'The class with the code `:attribute` not found.',
    cannotJoinTheClass: "You can't join this class.",
    alreadyJoined: 'You already joined this class.',
    dontHavePermissionToDeleteClass:
        "You don't have any permissions to delete this class",
    dontHavePermissionToUpdateClass:
        "You don't have any permissions to update this class",
    dontHavePermissionToGetClassCode:
        "You don't have any permissions to get this class's code",
    // clsas - success
    classDeleted: 'The class has been successfully deleted.',
    classUpdated: 'The class has been successfully updated.',
    classCodeUpdated: 'The class code has been successfully updated.',
    classCreated: 'The class has been successfully created.',
    studentJoined: 'You have been successfully joined to this class.',
    // works - success
    workDeleted: 'The work has been successfully deleted.',
    workUpdated: 'The work has been successfully updated.',
    workCreated: 'The work has been successfully created.',
    // works - error
    workNotFound: 'The work with the id `:attribute` not found.',
    dontHavePermissionToCreateWorkForThisClass:
        "You don't have any permissions to create work for this class",
    dontHavePermissionToUpdateWorkForThisClass:
        "You don't have any permissions to update work for this class",
    dontHavePermissionToDeleteWorkForThisClass:
        "You don't have any permissions to delete work for this class",
};

// TODO: change `the user` to `you`
export const authMessages = {
    userRegistered: 'You have been successfully registered.',
    failed: 'Sign in failed, try again!.',
    userLoggedIn: 'You have been successfully logged in.',
    noToken: 'Not authorized, no token.',
    tokenNotValid: 'Token not valid.',
    hasLoggedIn: 'You already logged in.',
    loginRequired: 'You are not logged in.',
    userLoggedOut: 'You have been successfully logged out.',
};

export const validationMessages = {
    required: 'The :attribute field is required.',
    email: 'The :attribute must be a valid email address.',
    alreadyRegistered: 'The :attribute already registered.',
    alphaNum: 'The :attribute must only contain letters and numbers.',
    notValid: 'The :attribute value is not valid.',
};

export const inputsValidationMessages = {
    usernameRequired: setAttributeMessage(
        validationMessages.required,
        'username'
    ),
    passwordRequired: setAttributeMessage(
        validationMessages.required,
        'password'
    ),
    emailRequired: setAttributeMessage(validationMessages.required, 'email'),
    emailNotValid: setAttributeMessage(validationMessages.email, 'email'),
    emailAlreadyRegistered: setAttributeMessage(
        validationMessages.alreadyRegistered,
        'email'
    ),
    usernameAlreadyRegistered: setAttributeMessage(
        validationMessages.alreadyRegistered,
        'username'
    ),
    usernameAlphaNum: setAttributeMessage(
        validationMessages.alphaNum,
        'username'
    ),
    // classes
    nameRequired: setAttributeMessage(validationMessages.required, 'name'),
    // works
    titleRequired: setAttributeMessage(validationMessages.required, 'title'),
    classIdRequired: setAttributeMessage(
        validationMessages.required,
        'class id'
    ),
    typeNotValid: setAttributeMessage(validationMessages.notValid, 'type'),
    dueDateNotValid: setAttributeMessage(
        validationMessages.notValid,
        'duedate'
    ),
    typeRequired: setAttributeMessage(validationMessages.required, 'type'),
};
