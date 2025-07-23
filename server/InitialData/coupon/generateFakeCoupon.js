const { faker } = require('@faker-js/faker');
const generateRandomCouponCode = (_length = 12) => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    
    const length = Math.max(6, Math.min(20, _length));
    
    let code = '';
    
    code += uppercase[Math.floor(Math.random() * uppercase.length)];
    code += lowercase[Math.floor(Math.random() * lowercase.length)];
    code += digits[Math.floor(Math.random() * digits.length)];
    
    const allChars = lowercase + uppercase + digits;
    for (let i = code.length; i < length; i++) {
        code += allChars[Math.floor(Math.random() * allChars.length)];
    }    
    return code.split('').sort(() => Math.random() - 0.5).join('');
};


const generateRandomCouponData = ({companiesIds, categoriesIds,_userId}) => {
    const company = faker.helpers.arrayElement(companiesIds);
    const category = faker.helpers.arrayElement(categoriesIds);
    return {
        name: faker.lorem.word({strategy: 'words', length: 8}),
        code: generateRandomCouponCode(Math.floor(Math.random() * 12) + 6),
        store: company,
        category: category,
        description: faker.lorem.sentence(),
        amount: Number(Math.floor(Math.random() * 800) + 1),
        discount: 0,
        used: faker.datatype.boolean(),
        favorite: faker.datatype.boolean(),
        website: faker.internet.url(),
        expiryDate: Date.now() + 7 * 24 * 60 * 60 * 1000,
        userId: _userId
    }
}


module.exports = { generateRandomCouponData };
