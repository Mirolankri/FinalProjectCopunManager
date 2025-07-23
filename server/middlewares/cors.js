const express = require('express');
const app = express();
const cors = require('cors');

const CorsMiddleware = {
    origin: ['http://127.0.0.1:5500','http://localhost:3000',"https://calm-papayas-grow.loca.lt"],
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(cors(CorsMiddleware));

module.exports = app;