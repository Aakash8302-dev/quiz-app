const express = require("express");
const {createSetting, getSetting} = require("../controllers/settingController.js")

const router = express.Router();


router.route("/").post(createSetting).get(getSetting);


module.exports = router