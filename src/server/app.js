import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import marketRouter from './routes/market';
import userRouter from './routes/user';
import orderRouter from './routes/order';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/market', marketRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);


export default app;
