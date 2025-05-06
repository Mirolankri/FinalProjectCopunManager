require('dotenv').config()

const express = require('express');
const app = express();

const morganLogger = require('./loggers/morganLogger');
const LOGGER = process.env.LOGGER;

if(LOGGER === 'morgan'){
    app.use(morganLogger);
}

module.exports = app;