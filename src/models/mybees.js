const mongoose = require('mongoose');
const { Schema } = mongoose;

const myBeesSchema = new Schema({
    name: String,
    emailId: String,
    location: String,
    postcode: String
});

const MyBees = mongoose.model('mybees', myBeesSchema);

module.exports = MyBees;