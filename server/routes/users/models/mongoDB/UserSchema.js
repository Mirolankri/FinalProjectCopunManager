const mongoose = require('mongoose');

const NameSchema = mongoose.Schema({
    first: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
        trim: true
    },
    last: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
        trim: true
    }
})

const UserSchema = mongoose.Schema({
    name: NameSchema,
    phone: {
        type: String,
        match: RegExp(/^[0][5][0|2|3|4|5|8|9]{1}[0-9]{7}$/g),
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        match: RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    },
    password: {
        type: String,
        match: RegExp(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isUser: {
        type: Boolean,
        default: false
    },
    parentuserId: {
        type: String,
        match: RegExp(/^[0-9a-fA-F]{24}$/),
        default: null
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("user", UserSchema);
