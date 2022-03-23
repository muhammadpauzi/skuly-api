import mongoose from 'mongoose';
import { errorLog, successLog } from '../utils/log.js';

export const connectToMongoDB = async () => {
    try {
        const mongoURI = getEnv('MONGO_URI');
        await mongoose.connect(mongoURI);
        successLog('Connected to MongoDB!');
    } catch (error) {
        errorLog(error);
    }
};
