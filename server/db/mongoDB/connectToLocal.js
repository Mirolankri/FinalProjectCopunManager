require('dotenv').config()

const mongoose = require('mongoose');
const chalk = require('chalk');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then( ()=>{ console.log(chalk.bgGreen('Connected to monogDB Locally'))})
.catch((error)=> console.log(chalk.bgRed(`monogDB error: ${error}`)));