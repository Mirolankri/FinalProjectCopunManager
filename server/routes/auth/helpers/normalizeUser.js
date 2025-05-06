const normalizeUser = UserData => {
    const isAdmin = UserData.hasOwnProperty('isAdmin') ? UserData.isAdmin : UserData.hasOwnProperty('parentuserId') ? false : true;
    const isUser = UserData.hasOwnProperty('isUser') ? UserData.isUser : UserData.hasOwnProperty('parentuserId') ? true : false;

    const user = {
        ...UserData,
        isSuperAdmin: false,
        isAdmin: isAdmin,
        isUser: isUser,
        parentuserId: UserData.parentuserId || null
    };

    return user;
};

module.exports = normalizeUser;