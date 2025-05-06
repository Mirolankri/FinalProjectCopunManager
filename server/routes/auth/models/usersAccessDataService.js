require('dotenv').config();
const { pick } = require('lodash');
const UserSchema = require('../../users/models/mongoDB/UserSchema');
const AuditLoginUserSchema = require('../models/mongoDB/auditLogin');
const { comparePassword } = require('../helpers/bcrypt');
const { generateAuthToken } = require('../providers/jwt');
const DB = process.env.DB;

const registerUser = async (normalizeUser) => {
    if(DB === 'mongoDB'){
        try {
            const { phone, parentuserId } = normalizeUser;
            let user = await UserSchema.findOne({phone});
            if (user) throw new Error('This Phone is already registered!');
            user = new UserSchema(normalizeUser);
            user = await user.save();
            if(!parentuserId){
                user.parentuserId = user._id.toString();
                user = await user.save();
            }
            user = pick(user, ['name', 'email','phone', '_id', 'parentuserId']);
            return Promise.resolve(user);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};
const loginUser = async ({email, phone, password}) => {
    if(DB === 'mongoDB'){
        try {
            const nowTime = new Date();

            const user = await UserSchema.findOne({phone});
            if (!user) throw new Error('מספר טלפון או סיסמא אינם תקינים');

            const validPassword = comparePassword(password, user.password);
            let counter = await AuditLoginUserSchema.findOne({userId: user._id});

            if(counter){
                if(counter.counter.length === 3){
                    const diff = nowTime - counter.counter[2];
                    // const daynumber = 0.1;
                    // const day = 3600 * 1000 * daynumber;
                    // i want to wait 10 minutes before login
                    const minutes = 1;
                    const day = 60 * 1000 * minutes;

                    if(diff < day) throw new Error(`אתה צריך להמתין ${minutes} דקות לפני להתחבר שוב`);
                    await AuditLoginUserSchema.findByIdAndDelete(counter._id);
                }
            }

            if(!validPassword) {
                if(!counter) {
                    let login = {userId: user._id, counter: [nowTime]};
                    login = new AuditLoginUserSchema(login);
                    await login.save();
                    throw new Error('מספר טלפון או סיסמא אינם תקינים');
                }

                if(counter.counter.length < 3){
                    counter.counter.push(nowTime);
                    await AuditLoginUserSchema.findByIdAndUpdate(counter._id, {counter: counter.counter});
                    throw new Error('מספר טלפון או סיסמא אינם תקינים');
                }
            };
            
            const token = generateAuthToken(user);

            if(counter){
                await AuditLoginUserSchema.findByIdAndDelete(counter._id);
            }

            return Promise.resolve(token);
        } catch (error) {
            error.status = 403;
            return Promise.reject(error);
        }
    }

    return Promise.resolve('Not in mongoDB');
};

module.exports = { registerUser, loginUser };