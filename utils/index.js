export const getEnv = (key = '', defaultValue = null) => {
    return process.env[key] || defaultValue;
};

export const isDevelopment = () => {
    return getEnv('NODE_ENV', 'development') === 'development';
};