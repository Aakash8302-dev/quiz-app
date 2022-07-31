const mongoose = require('mongoose');

const userAnswerSchema = mongoose.Schema({
    name: {
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
    answers: [
        {
            questionText: {
                type: String,
            },
            questionSet: {
                type: String,
            },
            questionDept: {
                type: String,
            },
            options: [
                {
                    optionText: {
                        type: String,
                    },
                    uid: {
                        type: String,
                    },
                },
            ],
            userAnswer: {
                type: String,
            },
            correctAnswer: {
                type: String,
            },
        },
    ],
});

const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);

module.exports = UserAnswer;
