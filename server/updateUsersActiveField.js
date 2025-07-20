require('dotenv').config();
const UserSchema = require('./routes/users/models/mongoDB/UserSchema');

const updateUsersActiveField = async () => {
    try {
        const usersToUpdate = await UserSchema.find({
            $or: [
                { active: { $exists: false } },
                { active: null },
                { active: undefined }
            ]
        });


        if (usersToUpdate.length === 0) {
            console.log('כל המשתמשים כבר מעודכנים עם שדה active');
            return;
        }

        const result = await UserSchema.updateMany(
            {
                $or: [
                    { active: { $exists: false } },
                    { active: null },
                    { active: undefined }
                ]
            },
            {
                $set: { active: true }
            }
        );

        console.log(`עודכנו ${result.modifiedCount} משתמשים בהצלחה`);
        console.log('כל המשתמשים עכשיו מכילים את שדה active עם הערך true');

    } catch (error) {
        console.error('שגיאה בעדכון המשתמשים:', error);
    }
};

module.exports = {updateUsersActiveField};