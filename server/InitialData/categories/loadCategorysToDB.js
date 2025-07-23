const CategoriesSchema = require('../../routes/coupons/models/mongoDB/CategoriesSchema');
const { categories } = require('./categories');

const loadCategorys = async () => {
    try {
        const CountData = await CategoriesSchema.countDocuments();
        if(CountData > 0) return;
        await CategoriesSchema.deleteMany({});
        const categorysData = categories.map(category => ({
            name: category.name,
            active: true
        }));
        
        const result = await CategoriesSchema.insertMany(categorysData);
        
        console.log(` נטענו ${result.length} קטגוריות בהצלחה!`);        
    } catch (error) {
        console.error('Error loading categorys:', error);
        
    }
};

module.exports = { loadCategorys };
