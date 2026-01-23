import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mainRouter from './routes/login-routes.js';
import { received } from './middleware/logging-middleware.js';


const app = express();

dotenv.config();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(received)
app.use('/uploads/pfp', express.static('./uploads/pfp'));

app.use('/api', mainRouter);


const PORT = process.env.APP_PORT

const server = app.listen(PORT, () => { 
    console.log(`APP SHOULD BE RUNNING on ${PORT}`)
})