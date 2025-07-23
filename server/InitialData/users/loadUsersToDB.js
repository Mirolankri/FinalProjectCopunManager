const { generateUserPassword } = require('../../routes/auth/helpers/bcrypt');
const normalizeUser = require('../../routes/auth/helpers/normalizeUser');
const { registerUser } = require('../../routes/auth/models/usersAccessDataService');
const { validateRegistration } = require('../../routes/auth/validations/authValidationService');
const UserSchema = require('../../routes/users/models/mongoDB/UserSchema');
const { handleJoiError } = require('../../utils/errorHandler');
const { generateUser } = require('./generateFakeUsers');
const fs = require('fs');
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV;
const users = []
const loadUsers = async () => {
    const path = process.cwd();
    try {
        if(NODE_ENV !== 'development') return;
        const CountData = await UserSchema.countDocuments();
        if(CountData > 0) return;
        for (let i = 0; i < 1; i++) {
            const Super = generateUser('superadmin');  
                      
            fs.writeFileSync(path + '/superadmin.txt', `username:${Super.phone}\npassword:${Super.password}`);
            users.push(Super);
        }
        for (let i = 0; i < 3; i++) {
            const Admin = generateUser('admin');
            fs.writeFileSync(path + `/admin${i}.txt`, `username:${Admin.phone}\npassword:${Admin.password}`);
            users.push(Admin);
        }
        for (const user of users) {
            let userData = user;
                const { error } = validateRegistration(userData);                
                if (error) return handleJoiError(error, 400, `Joi Error: ${error.details[0].message}`);
                userData = normalizeUser(userData);
                userData.password = generateUserPassword(userData.password);
                userData = await registerUser(userData);
        }
        
        console.log(`${users.length} Users loaded successfully! show in Server Folder to Get Login Details`);        
    } catch (error) {
        console.error('Error loading users:', error);
    }
};

module.exports = { loadUsers };
