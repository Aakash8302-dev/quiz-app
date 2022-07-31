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
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
})

const UserFeedback = mongoose.model('UserFeedback', userFeedbackSchema)

module.exports = UserFeedback