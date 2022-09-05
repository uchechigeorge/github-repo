import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

// Config for env file
dotenv.config();

const app = express();

app.use('/', routes); 

export default app;