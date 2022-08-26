const mongoose = require('mongoose');

const settingSchema = mongoose.Schema({
    showAnswer:{
        type: Boolean,
        required: true
    },
    instituteName:{
        type: String,
        required: true
    }
})

const Setting = mongoose.model('Setting', settingSchema)

module.exports = Setting