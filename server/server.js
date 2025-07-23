require('dotenv').config()
const express = require('express');
const app = express();

const chalk = require('chalk');
const connectToDB = require('./db/dbService');
const router = require('./router/router');
const cors = require('./middlewares/cors');
const logger = require('./middlewares/logger/loggerService');
const { generateUserPassword } = require('./routes/auth/helpers/bcrypt');
const { updateUsersActiveField } = require('./updateUsersActiveField');
const { loadInitialData } = require('./InitialData/LoadInitialData');

const PORT = process.env.PORT || 5555;
const ENV = process.env.NODE_ENV;
const API_URL = process.env.API_URL;

app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.static('./public'));
app.use(router);
// console.log(generateUserPassword("Aa1234!"));

app.listen(PORT, async () => {
    console.log(chalk.bgGreen(`Server Listening on: ${API_URL}:${PORT}`));
    connectToDB(ENV);
    if(ENV === 'development'){
        await loadInitialData();
    }
    // await updateUsersActiveField();
});
