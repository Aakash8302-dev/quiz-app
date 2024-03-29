const mongoose = require('mongoose');

const userAnswerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    regNo: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    totalScore: {
        type: Number,
    },
    aptitudeScore: {
        type: Number,
    },
    verbalScore: {
        type: Number,
    },
    codingScore: {
        type: Number,
    },
    coreScore: {
        type: Number,
    },
    tabswitch:{
        type: Number
    }
});

const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);

module.exports = UserAnswer;
