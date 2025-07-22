require('dotenv').config();
const { pick, drop, omit } = require('lodash');
const DB = process.env.DB;
const CompaniesSchema = require('./mongoDB/CompaniesSchema');

const GetCompanies = async () => {
    if(DB === 'mongoDB'){
        try {
            const companies = await CompaniesSchema.find({active: true});
            return Promise.resolve(companies);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
};
const GetCompaniesById = async (id) => {
    if(DB === 'mongoDB'){
        try {
            const companies = await CompaniesSchema.findById(id);
            return Promise.resolve(companies);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve('Not in mongoDB');
};

module.exports = { GetCompanies, GetCompaniesById };