const mongoose = require('mongoose');
const { Schema } = mongoose;

const evaluationSchema = new Schema({
    date: {
        type: Date,
    },
    peopleId: String,
    values: {
        Volkstärke: {
            type: String,
            default: "lightgrey"
        },
        Raumreserve: {
            type: String,
            default: "lightgrey"
        },
        Weiselrichtigkeit: {
            type: String,
            default: "lightgrey"
        },
        Sanftmut: {
            type: String,
            default: "lightgrey"
        },
        Schwarmstimmung: {
            type: String,
            default: "lightgrey"
        },
        Futterversorgung: {
            type: String,
            default: "lightgrey"
        },
        Gesundheit: {
            type: String,
            default: "lightgrey"
        },
        VarroaBeurteilung: {
            type: String,
            default: "lightgrey"
        }
    }
});

const EvaluationPeople = mongoose.model('evaluation', evaluationSchema);

module.exports = EvaluationPeople;