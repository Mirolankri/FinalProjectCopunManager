require('dotenv').config();
const { pick, drop, omit } = require('lodash');
const DB = process.env.DB;
const SubscriptionSchema = require('./mongoDB/SubscriptionSchema');

const Subscribe = async (email) => {
    if(DB === 'mongoDB'){
        try {
            const subscription = await SubscriptionSchema.create({ email });
            return Promise.resolve(subscription);
        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        }
    }
    return Promise.resolve('Not in mongoDB');
};
const GetSubscriptions = async () => {
    if(DB === 'mongoDB'){
        try {
            const subscriptions = await SubscriptionSchema.find({});
            return Promise.resolve(subscriptions);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve('Not in mongoDB');
};
const GetSubscriptionByEmail = async (email) => {
    if(DB === 'mongoDB'){
        try {
            const subscription = await SubscriptionSchema.findOne({ email });
            return Promise.resolve(subscription);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve('Not in mongoDB');
};

module.exports = { Subscribe, GetSubscriptions, GetSubscriptionByEmail };