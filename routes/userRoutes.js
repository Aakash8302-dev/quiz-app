const express = require("express");
const { registerUser, submitAnswer, getResult, createFeedback, getFeedback, getLeaderBoard, checkSubmission, registerAdmin, loginAdmin } = require("../controllers/userController.js");
const { protect, authAdmin } = require('../middlewares/authMiddleware')

const router = express.Router();

router.route('/register')
    .post(registerUser);

router.route('/answer')
    .get(protect, getResult)
    .post(protect, submitAnswer);

router.route('/feedback')
    .get(protect, authAdmin, getFeedback)
    .post(protect, createFeedback);

router.route('/leaderboard')
    .get(protect, authAdmin, getLeaderBoard);

router.route('/checkSubmission')
    .get(protect, checkSubmission)

router.route('/aregister')
    .post(registerAdmin)

router.route('/alogin')
    .post(loginAdmin)

module.exports = router