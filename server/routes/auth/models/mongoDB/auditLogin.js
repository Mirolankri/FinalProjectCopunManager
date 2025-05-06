const mongoose = require('mongoose');

const AuditLoginUserSchema = mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId
    },
    counter: [Date]
});

module.exports = mongoose.model("auditLogin", AuditLoginUserSchema);