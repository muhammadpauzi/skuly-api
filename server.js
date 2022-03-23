import express from 'express';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnv, isDevelopment } from './utils';
import { connectToMongoDB } from './configs/database.js';
import { infoLog } from './utils/log.js';
dotenv.config();

const app = express();
const PORT = getEnv('PORT', 5000);

await connectToMongoDB();

app.listen(PORT, () => {
    // development mode
    if (isDevelopment())
        infoLog(`Server is running at http://localhost:${PORT}`);
    // production mode
    infoLog(`Server is running in production mode on port ${PORT}`);
});
