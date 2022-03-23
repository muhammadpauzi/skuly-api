export const setAttributeMessage = (message = '', attribute = '') => {
    return message.replace(':attribute', attribute);
};
