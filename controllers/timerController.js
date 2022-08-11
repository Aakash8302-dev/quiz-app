const asyncHandler = require("express-async-handler");
const Timer = require("../models/timerModel.js")

const setTimer = asyncHandler(async (req, res) => {
    try {
        const { endTime } = req.body

        const userID = "62f3aee3af3a53a2255e894c"

        timerCreated = await Timer.findByIdAndUpdate(userID, { "endTime": endTime })

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