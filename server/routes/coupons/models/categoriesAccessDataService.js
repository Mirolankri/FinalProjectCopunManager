require('dotenv').config();
const { pick, drop, omit } = require('lodash');
const CategoriesSchema = require('./mongoDB/CategoriesSchema');
const DB = process.env.DB;

const GetCategories = async () => {
    if(DB === 'mongoDB'){
        try {
            const categories = await CategoriesSchema.find({active: true});
            return Promise.resolve(categories);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
};
const GetCategoriesById = async (id) => {
    if(DB === 'mongoDB'){
        try {
            const categories = await CategoriesSchema.findById(id);
            return Promise.resolve(categories);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve('Not in mongoDB');
};

module.exports = { GetCategories, GetCategoriesById };