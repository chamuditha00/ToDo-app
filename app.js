const express = require('express');

const body_parser = require('body-parser');
const userRouter = require('./routers/user.router');
const carRouter = require('./routers/car.router');




const app = express();
app.use(body_parser.json());

app.use('/', userRouter);
app.use('/car', carRouter);

module.exports = app;

