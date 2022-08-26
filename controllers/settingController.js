const asyncHandler = require("express-async-handler");
const Setting = require('../models/settingModel.js')

const createSetting = asyncHandler(async (req, res) => {
    try {
        const {showAnswer} = req.body

        userID = "6301e3a30137dc85d35b22de"

        await Setting.findByIdAndUpdate(userID, { "showAnswer": showAnswer})

        const settingCreated = await Setting.find({})

        // const settingCreated = await Setting.create({
        //     showAnswer
        // })

        if (settingCreated) {
            res.status(201).json(settingCreated[0]);
        }

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})


const getSetting = asyncHandler(async (req, res) => {
    try {

        const data = await Setting.find({})

        if (data) {
            res.status(201).json(data[0])
        }

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})


module.exports = { createSetting, getSetting}