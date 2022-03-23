export const errorLog = (message = '', key = 'Error :') => {
    console.log(key.red.bold, message);
};

export const successLog = (message = '', key = 'Success :') => {
    console.log(key.green.bold, message);
};

export const infoLog = (message = '', key = 'Info :') => {
    console.log(key.cyan.bold, message);
};
