const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactsSchema = new Schema({
    type: String,
    website: {
        type: String,
        required: false
    },
    name: String,
    tel: String,
    fax: String,
    address: String,
    email: String
});

const Contacts = mongoose.model('contacts', contactsSchema);

module.exports = Contacts;