import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
    try {
        const mongoURI = getEnv('MONGO_URI');
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.log(error);
    }
};
