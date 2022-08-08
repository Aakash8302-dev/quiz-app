const mongoose = require('mongoose');

const userFeedbackSchema = mongoose.Schema({
    regNo: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
})

const UserFeedback = mongoose.model('UserFeedback', userFeedbackSchema)

module.exports = UserFeedback