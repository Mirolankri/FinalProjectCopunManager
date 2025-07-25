const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 256,
        required: false,
        default: null,
        trim: true
    },
    code: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
        trim: true
    },
    codeHash: {
        type: String,
        required: true
    },
    store: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
        trim: true
    },
    category: {
        type: String,
        maxLength: 256,
        required: false,
        trim: true
    },
    description: {
        type: String,
        maxLength: 256,
        required: false,
        default: null,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    used: {
        type: Boolean,
        default: false
    },
    favorite: {
        type: Boolean,
        default: false
    },
    website: {
        type: String,
        default: ''
    },
    sharedWith: {
        type: Array,
        default: []
    },
    expiryDate: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Types.ObjectId
    }
});

module.exports = mongoose.model('coupon', CouponSchema);
