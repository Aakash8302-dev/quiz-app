const mongoose = require('mongoose');

const timerSchema = mongoose.Schema({
    endTime: {
        type: Number,
        required: true
    }
})

const Timer = mongoose.model('Timer', timerSchema)

module.exports = Timer