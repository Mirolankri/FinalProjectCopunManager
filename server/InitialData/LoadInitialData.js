const { loadCategorys } = require('./Categorys/loadCategorysToDB');
const { loadCompanies } = require('./loadCompaniesToDB');

const loadInitialData = async () => {
    try {
        await loadCompanies();
        await loadCategorys();
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
};

module.exports = { loadInitialData };