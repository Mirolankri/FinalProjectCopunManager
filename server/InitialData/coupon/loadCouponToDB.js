const { generateRandomCouponData } = require('./generateFakeCoupon.js');
const { GetAllUsers } = require('../../routes/auth/models/usersAccessDataService.js');
const { CreateCoupon } = require('../../routes/coupons/models/couponAccessDataService.js');
const CouponSchema = require('../../routes/coupons/models/mongoDB/CouponSchema.js');
const { GetCompanies } = require('../../routes/coupons/models/companiesAccessDataService.js');
const { GetCategories } = require('../../routes/coupons/models/categoriesAccessDataService.js');

require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV;

const loadCoupon = async () => {
    try {
        if(NODE_ENV !== 'development') return;
        const CountData = await CouponSchema.countDocuments();
        if(CountData > 0) return;

        const companies = await GetCompanies();
        const companiesIds = companies.map(company => company._id.toString());
        const categories = await GetCategories();
        const categoriesIds = categories.map(category => category._id.toString());
        const Users = await GetAllUsers();
        for (const user of Users) {
            for (let i = 0; i < 10; i++) {
                const coupon = generateRandomCouponData({companiesIds, categoriesIds, _userId: user._id});                
                await CreateCoupon(coupon);
            }
        }
        
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = { loadCoupon };
