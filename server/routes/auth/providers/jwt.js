require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;

const generateAuthToken = (user) => {
    const { _id, isSuperAdmin,isUser, isAdmin } = user;

    const token = jwt.sign({ _id, isSuperAdmin,isUser, isAdmin }, JWT_KEY, { expiresIn: '72h' });

    return token;
}

const verifyAuthToken = (token) => {
    try {
        const userData = jwt.verify(token, JWT_KEY);
        return userData;
    } catch (error) {
        return null;
    }
}

module.exports = { verifyAuthToken, generateAuthToken };