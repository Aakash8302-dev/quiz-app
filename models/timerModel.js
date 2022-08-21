const mongoose = require('mongoose');

const timerSchema = mongoose.Schema({
    startTime:{
        type: String,
        required: true
    },  
    endTime: {
        type: String,
        required: true
    }
})

const Timer = mongoose.model('Timer', timerSchema)

module.exports = Timer