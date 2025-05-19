const { allow } = require('joi');
const mongoose = require('mongoose');

const SharedCouponSchema = new mongoose.Schema({
    shareName: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
        trim: true
    },
    expiryDate: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    url: {
        type: String,
        allow: ''
    },
    couponId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('sharedCoupon', SharedCouponSchema);
