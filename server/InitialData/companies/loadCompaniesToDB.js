const Company = require('../../routes/coupons/models/mongoDB/CompaniesSchema');
const { companies } = require('./companies');

const loadCompanies = async () => {
    try {
        const CountData = await Company.countDocuments();
        if(CountData > 0) return;
        await Company.deleteMany({});
        const companiesData = companies.map(company => ({
            // id: parseInt(company.value === 'other' ? 999 : company.value),
            name: company.label,
            active: true
        }));
        
        const result = await Company.insertMany(companiesData);
        
        console.log(`${result.length} Companies loaded successfully!`);        
    } catch (error) {
        console.error('Error loading companies:', error);
    }
};

module.exports = { loadCompanies };
