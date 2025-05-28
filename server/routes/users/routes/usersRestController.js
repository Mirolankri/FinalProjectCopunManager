require('dotenv').config();
const express = require('express');
const { handleError } = require('../../../utils/errorHandler');
const auth = require('../../auth/services/authService');
const { GetMe, UpdateUser } = require('../../auth/models/usersAccessDataService');
const userUpdateValidation = require('../../auth/validations/Joi/userUpdateValidation');
const router = express.Router();

router.get('/me',auth, async(req, res) => {
    try {
        const user = req.user;
        if(!user) throw new Error('משתמש לא נמצא');
        const GetMeData = await GetMe({userId: user._id});
        return res.status(200).send(GetMeData);
        
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.put('/',auth, async(req, res) => {
    try {
        const user = req.user;
        if(!user) throw new Error('משתמש לא נמצא');
        let updatedUser = req.body;
        delete updatedUser.password;
        // updatedUser._id = user._id;
        const { error } = userUpdateValidation(updatedUser);
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
        updatedUser = await UpdateUser({userId: user._id, data: req.body});
        return res.status(200).send(updatedUser);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

module.exports = router;