const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'a_very_secure_encryption_key_of_32char'; // צריך להיות 32 תווים
const IV_LENGTH = 16;

/**
 * @param {string} text הטקסט שיש להצפין
 * @returns {string} הטקסט המוצפן בפורמט hex 
 */
const encrypt = (text) => {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + '.' + encrypted;
  } catch (error) {
    console.error('שגיאה בהצפנה:', error.message);
    return text; 
  }
};

/**
 * מפענח טקסט שהוצפן בשיטת AES-256-CBC
 * @param {string} encryptedText הטקסט המוצפן בפורמט IV.EncryptedText
 * @returns {string} הטקסט המקורי לאחר פענוח
 */
const decrypt = (encryptedText) => {
  try {
    const textParts = encryptedText.split('.');
    if (textParts.length !== 2) {
      throw new Error('פורמט הצפנה לא תקין');
    }
    
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedTextOnly = textParts[1];
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    
    let decrypted = decipher.update(encryptedTextOnly, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('שגיאה בפענוח:', error.message);
    return encryptedText; 
  }
};
const generateCodeHash = (text) => {
  return crypto.createHash('sha256').update(text).digest('hex');
};
module.exports = {
  encrypt,
  decrypt,
  generateCodeHash
};