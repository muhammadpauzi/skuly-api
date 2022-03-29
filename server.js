import express from 'express';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { getEnv, isDevelopment } from './utils/index.js';
import { connectToMongoDB } from './configs/database.js';
import { infoLog } from './utils/log.js';
import { apiRouter } from './routes/index.js';
dotenv.config();

const app = express();
const PORT = getEnv('PORT', 5000);

await connectToMongoDB();

isDevelopment() && app.use(morgan('dev'));

// global middleware
app.use(cookieParser(getEnv('COOKIE_PARSER_SECRET', '123')));
app.use(
    cors({
        origin: getEnv('ALLOWED_ORIGINS').split(','),
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello!' });
});

// api routes
app.use('/api', apiRouter);

app.listen(PORT, () => {
    // development mode
    if (isDevelopment()) {
        infoLog(`Server is running at http://localhost:${PORT}`);
    } else {
        // production mode
        infoLog(`Server is running in production mode on port ${PORT}`);
    }
});
