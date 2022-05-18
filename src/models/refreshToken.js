const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
    token: String,
    emailId: {
        type: String,
        required: true
    },
    expiryDate: Date
});

const RefreshToken = mongoose.model('refreshtoken', tokenSchema);

module.exports = RefreshToken;