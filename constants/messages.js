export const responseMessages = {
    // error
    classNotFound: 'The class with the id `:attribute` not found.',
    classCodeNotExist: 'The class with the code `:attribute` not found.',
    cannotJoinTheClass: "You can't join this class.",
    alreadyJoined: 'You already joined this class.',
    // success
    classDeleted: 'The class has been successfully deleted.',
    classUpdated: 'The class has been successfully updated.',
    classCodeUpdated: 'The class code has been successfully updated.',
    classCreated: 'The class has been successfully created.',
    studentJoined: 'You have been successfully joined to this class.',
};

// TODO: change `the user` to `you`
export const authMessages = {
    userRegistered: 'The user has been successfully registered.',
    failed: 'Sign in failed, try again!.',
    userLoggedIn: 'The user has been successfully logged in.',
    noToken: 'Not authorized, no token.',
    tokenNotValid: 'Token not valid.',
    hasLoggedIn: 'The user already logged in.',
    loginRequired: 'You are not logged in.',
    userLoggedOut: 'The user has been successfully logged out.',
};

export const validationMessages = {
    required: 'The :attribute field is required.',
    email: 'The :attribute must be a valid email address.',
    alreadyRegistered: 'The :attribute already registered.',
    alphaNum: 'The :attribute must only contain letters and numbers.',
};
