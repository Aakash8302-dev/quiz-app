const express = require("express");
const { setTimer, getTimer } = require("../controllers/timerController.js")

const router = express.Router();


router.route("/").post(setTimer).get(getTimer);


module.exports = router