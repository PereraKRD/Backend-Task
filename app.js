// get express 
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

const user = require('./routes/index');

app.use('/api/v1',user)

//Middlewares to handle errors
app.use(errorMiddleware); 

module.exports = app;