const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    questionDept: {
        type: String,
    },
    questionSet: {
        type: String,
    },
    questionTitle: {
        type: String,
        required: true,
    },
    questionCategory: {
        type: String,
        required: true
    },
    options: [
        {
            optionText: {
                type: String,
                required: true,
            },
            uid: {
                type: String,
            },
        },
    ],
    correctAnswer: {
        type: String,
        required: true
    },
    userAnswer: {
        type: String,
    },
    imageUrl: {
        type: String
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
