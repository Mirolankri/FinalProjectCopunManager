const { faker } = require('@faker-js/faker');
const generateUser = (_role = 'admin') => {
    const name = {
        first: faker.person.firstName(),
        last: faker.person.lastName()
    }
    return {
        name: name,
        phone: generateIsraeliPhone(),
        email: generateEmail(name.first, name.last),
        password: generateRandomPassword(8),
        isAdmin: _role === 'admin' || _role === 'superadmin',
        isUser: _role === 'user',
        isSuperAdmin: _role === 'superadmin'
    };
}
const generateRandomPassword = (_length = 12) => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*-';
    
    const length = Math.max(6, Math.min(20, _length));
    
    let password = '';
    
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    
    const allChars = lowercase + uppercase + digits + specialChars;
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }    
    return password.split('').sort(() => Math.random() - 0.5).join('');
};
function generateIsraeliPhone() {
    const prefixes = ["050", "052", "053", "054", "055", "058"];
    const prefix = faker.helpers.arrayElement(prefixes);
    const rest = faker.string.numeric(7);
    return `${prefix}${rest}`;
}
function generateEmail(firstName, lastName) {
    const domain = faker.internet.domainName();
    return `${firstName}.${lastName}`.toLowerCase().replace(/[^a-z.]/g, "") + `@${domain}`;
}

module.exports = { generateUser };
