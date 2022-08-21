const asyncHandler = require("express-async-handler");
const Timer = require("../models/timerModel.js")

const setTimer = asyncHandler(async (req, res) => {
    try {
        const {startTime, endTime } = req.body

        const userID = "6300a6927bf8f0baec727320"

        let timerCreated = await Timer.findByIdAndUpdate(userID, { "startTime": startTime, "endTime": endTime })

        // const timerCreated = await Timer.create({
        //     startTime,
        //     endTime
        // })

        if (timerCreated) {
            res.status(201).json(timerCreated);
        }

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})
const getTimer = asyncHandler(async (req, res) => {
    try {

        const data = await Timer.find({})

        if (data) {
            res.status(201).json(data)
        }

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})


module.exports = { setTimer, getTimer }