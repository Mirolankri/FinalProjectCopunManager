require('dotenv').config();
const { handleError } = require('../../../utils/errorHandler');
const { verifyAuthToken } = require('../providers/jwt');

const tokenGenerator = process.env.TOKEN_GENERATOR;

const auth = (req, res, next) => {
    if(tokenGenerator === 'jwt'){
        try {
            const tokenFromClient = req.headers['x-auth-token'];
            if(!tokenFromClient) throw new Error('שגיאת התחברות: אנא התחבר');
    
            const userInfo = verifyAuthToken(tokenFromClient);
            if(!userInfo) throw new Error('שגיאת התחברות: משתמש שגוי');

            req.user = userInfo;
            return next();
        } catch (error) {
            handleError(res, 401, error.message)
        }
    }

    return handleError(res, 500, 'לא הוגדר שיטת זיהוי');
}

module.exports = auth;