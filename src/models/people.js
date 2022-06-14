const mongoose = require('mongoose');
const { Schema } = mongoose;

const beehivePeopleSchema = new Schema({
    designation: String,
    beehiveId: String,
    location: String
});

const BeehivePeople = mongoose.model('bees_people', beehivePeopleSchema);

module.exports = BeehivePeople;