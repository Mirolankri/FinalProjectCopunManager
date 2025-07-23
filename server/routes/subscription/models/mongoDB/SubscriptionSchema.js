const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        match: RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
        minLength: 5,
        maxLength: 256,
        required: true,
        trim: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('subscription', SubscriptionSchema);