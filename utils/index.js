const getEnv = (key = '', defaultValue = null) => {
    return process.env[key] || defaultValue;
};

const isDevelopment = () => {
    return getEnv('NODE_ENV', 'development') === 'development';
};

export { getEnv, isDevelopment };
