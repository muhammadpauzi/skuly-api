import mongoose from 'mongoose';
import { getEnv } from '../utils/index.js';
import { errorLog, successLog } from '../utils/log.js';

export const connectToMongoDB = async () => {
    try {
        const mongoURI = getEnv('MONGO_URI');
        await mongoose.connect(mongoURI);
        successLog('Connected to MongoDB!');
    } catch (error) {
        errorLog(error, 'MongoDB Error :');
        process.exit(1);
    }
};
