import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import createConnection from './database';

import router from './routes';
import errorHandler from './errors/handler';

createConnection();
const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

export { app };