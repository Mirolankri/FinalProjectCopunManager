require('dotenv').config();
const express = require('express');
const { handleError } = require('../../../utils/errorHandler');
const auth = require('../../auth/services/authService');
const { GetMe, UpdateUser, GetMyUsers, GetAllUsers, MakeAdmin, DeleteUser, registerUser } = require('../../auth/models/usersAccessDataService');
const userUpdateValidation = require('../../auth/validations/Joi/userUpdateValidation');
const { validateRegistration } = require('../../auth/validations/authValidationService');
const normalizeUser = require('../../auth/helpers/normalizeUser');
const { generateUserPassword } = require('../../auth/helpers/bcrypt');
const router = express.Router();

router.get('/',auth, async(req, res) => {
    try {
        const user = req.user;
        if(!user) throw new Error('משתמש לא נמצא');
        if(!user.isSuperAdmin) throw new Error('אתה לא מורשה');
        const GetAllUsersData = await GetAllUsers();
        return res.status(200).send(GetAllUsersData);
        
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

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
router.get('/my-users',auth, async(req, res) => {
    try {
        let UsersData = [];
        const user = req.user;
        if(!user) throw new Error('משתמש לא נמצא');
        if(!user.isAdmin) throw new Error('אתה לא מורשה');

        if(user.isSuperAdmin && user.isAdmin) UsersData = await GetAllUsers();
        if(!user.isSuperAdmin && user.isAdmin){
            const GetMeData = await GetMe({userId: user._id});
            if(!GetMeData) throw new Error('משתמש לא נמצא');
    
            UsersData = await GetMyUsers({userId: GetMeData.parentuserId});
        }

        return res.status(200).send(UsersData);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});
router.patch('/make-admin/:userId',auth, async(req, res) => {
    try {
        const user = req.user;
        if(!user) throw new Error('משתמש לא נמצא');
        if(!user.isAdmin) throw new Error('אתה לא מורשה');
        const { userId } = req.params;
        const updatedUser = await MakeAdmin(userId);
        return res.status(200).send(updatedUser);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});
router.delete('/:userId',auth, async(req, res) => {
    try {
        const user = req.user;
        const { userId } = req.params;

        if(!user) throw new Error('משתמש לא נמצא');
        if(!user.isAdmin) throw new Error('אתה לא מורשה');
        if(userId === user._id) throw new Error('אתה לא יכול למחוק את עצמך');
        const GetMeData = await GetMe({userId});        
        if(!GetMeData) throw new Error('משתמש לא נמצא');
        console.log("user._id", user._id);
        console.log("GetMeData.parentId", GetMeData.parentuserId);
        
        if(GetMeData.parentuserId !== user._id) throw new Error('אתה לא יכול למחוק את המשתמש');

        const deletedUser = await DeleteUser(userId);
        return res.status(200).send(deletedUser);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});
router.post('/',auth, async(req, res) => {
    try {
        const user = req.user;        
        let userData = req.body;
        if(!user) throw new Error('משתמש לא נמצא');
        if(!user.isAdmin) throw new Error('אתה לא מורשה');
        const GetMeData = await GetMe({userId: user._id});
        if(!GetMeData) throw new Error('משתמש לא נמצא');

        userData.parentuserId = GetMeData.parentuserId;
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
    
router.put('/:userId',auth, async(req, res) => {
    try {
        const user = req.user;
        const { userId } = req.params;
        if(!user) throw new Error('משתמש לא נמצא');
        let updatedUser = req.body;
        delete updatedUser.password;
        // updatedUser._id = user._id;
        const { error } = userUpdateValidation(updatedUser);
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
        updatedUser = await UpdateUser({userId: userId, data: req.body});
        return res.status(200).send(updatedUser);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

module.exports = router;