export const getEnv = (key = '', defaultValue = '') => {
    return process.env[key] || defaultValue;
};

export const isDevelopment = () => {
    return getEnv('NODE_ENV', 'development') === 'development';
};

export const log = (message = '') => {
    console.log(message);
};
