require('dotenv').config();
const express = require('express');
const { handleError } = require('../../../utils/errorHandler');
const { validateRegistration, validateLogin } = require('../validations/authValidationService');
const normalizeUser = require('../helpers/normalizeUser');
const { generateUserPassword } = require('../helpers/bcrypt');
const { registerUser, loginUser } = require('../models/usersAccessDataService');
const router = express.Router();

router.post('/register', async(req, res) => {
    try {
        let userData = req.body;
        const { error } = validateRegistration(userData);
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
        userData = normalizeUser(userData);
        userData.password = generateUserPassword(userData.password);
        userData = await registerUser(userData);
        return res.status(201).send(userData);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});
router.post('/login', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    try {
        const user = await loginUser(req.body);
        return res.send(user);
    } catch (error) {
        error.status = 400;
        return handleError(res, error.status, error.message);
    }
});


module.exports = router;