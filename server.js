import express from 'express';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnv, isDevelopment } from './utils';
dotenv.config();

const app = express();
const PORT = getEnv('PORT', 5000);

app.listen(PORT, () => {
    // development mode
    if (isDevelopment())
        console.log(`Server is running at http://localhost:${PORT}`);
    // production mode
    console.log(`Server is running in production mode on port ${PORT}`);
});
