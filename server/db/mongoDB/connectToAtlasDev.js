require('dotenv').config()

const mongoose = require('mongoose');
const chalk = require('chalk');
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then( ()=>{ console.log(chalk.magentaBright('Connected to monogDB Atlas Development'))})
.catch((error)=> console.log(chalk.redBright.bold(`monogDB error: ${error}`)));