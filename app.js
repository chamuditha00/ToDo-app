const express = require('express');

const body_parser = require('body-parser');
const userRouter = require('./routers/user.router');
const carRouter = require('./routers/car.router');
const rentRouter = require('./routers/rent.router');



const app = express();
app.use(body_parser.json());

app.use('/', userRouter);
app.use('/car', carRouter);
app.use('/rent', rentRouter);

module.exports = app;

