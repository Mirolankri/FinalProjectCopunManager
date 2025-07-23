const { loadCategorys } = require('./categories/loadCategorysToDB');
const { loadCompanies } = require('./companies/loadCompaniesToDB');
const { loadCoupon } = require('./coupon/loadCouponToDB');
const { loadUsers } = require('./users/LoadUsersToDB');

const loadInitialData = async () => {
    try {
        await loadCompanies();
        await loadCategorys();
        await loadUsers();
        await loadCoupon();
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
};

module.exports = { loadInitialData };