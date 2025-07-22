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
        
        console.log(`✅ נטענו ${result.length} קטגוריות בהצלחה!`);
        console.log('📋 רשימת הקטגוריות שנטענו:');
        
        result.forEach((category, index) => {
            console.log(`   ${index + 1}. ${category.name}`);
        });
        
    } catch (error) {
        console.error('❌ שגיאה בטעינת החברות:', error);
        
        // אם יש שגיאת duplicate key, ננסה לעדכן במקום להכניס
        if (error.code === 11000) {
            console.log('🔄 מנסה לעדכן חברות קיימות...');
            
            for (const category of categories) {
                try {
                    const categoryId = parseInt(category.value === 'other' ? 999 : category.value);
                    
                    await CategoriesSchema.findOneAndUpdate(
                        { id: categoryId },
                        { 
                            name: category.label,
                            active: true 
                        },
                        { 
                            upsert: true, // יצור חדש אם לא קיים
                            new: true 
                        }
                    );
                    
                    console.log(`✅ עודכן/נוצר: ${company.label}`);
                    
                } catch (updateError) {
                    console.error(`❌ שגיאה בעדכון ${company.label}:`, updateError);
                }
            }
        }
    }
};

module.exports = { loadCategorys };
