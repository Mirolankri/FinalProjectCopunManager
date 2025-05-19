const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
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
        minLength: 2,
        maxLength: 256,
        required: false,
        default: '',
        trim: true
    },
    description: {
        type: String,
        minLength: 2,
        maxLength: 256,
        default: '',
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
