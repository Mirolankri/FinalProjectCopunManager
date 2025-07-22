const Company = require('../routes/coupons/models/mongoDB/CompaniesSchema');
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
        
        console.log(`✅ נטענו ${result.length} חברות בהצלחה!`);
        console.log('📋 רשימת החברות שנטענו:');
        
        result.forEach((company, index) => {
            console.log(`   ${index + 1}. ${company.name} (ID: ${company.id})`);
        });
        
    } catch (error) {
        console.error('❌ שגיאה בטעינת החברות:', error);
        
        // אם יש שגיאת duplicate key, ננסה לעדכן במקום להכניס
        if (error.code === 11000) {
            console.log('🔄 מנסה לעדכן חברות קיימות...');
            
            for (const company of companies) {
                try {
                    const companyId = parseInt(company.value === 'other' ? 999 : company.value);
                    
                    await Company.findOneAndUpdate(
                        { id: companyId },
                        { 
                            name: company.label,
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

module.exports = { loadCompanies };
