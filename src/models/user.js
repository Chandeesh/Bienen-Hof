const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        required: false
    },
    emailId: {
        type: String,
        required: true
    },
    activationToken: {
        type: String,
        required: false
    },
    timestamp: {
        type: String,
        required: true
    }
});

const JWTVerificationSchema = new Schema({
    token: {
        type: String,
        require: true,
        minlength: 139,
        maxlength: 139
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;