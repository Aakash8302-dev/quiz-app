const asyncHandler = require("express-async-handler")
const User = require('../models/userModel.js');
const UserAnswer = require('../models/userAnswerModel.js')
const UserFeedback = require('../models/userFeedbackModel.js');
const generateToken = require("../utils/generateToken.js");


const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, regNo, dept, role } = req.body;

        const exists = await User.findOne({ $and: [{ regNo }, { role }] });

        if (exists) {
            res.json({
                _id: exists._id,
                name: exists.name,
                regNo: exists.regNo,
                email: exists.email,
                dept: exists.dept,
                isVolunteer: exists.isVolunteer,
                token: generateToken(exists._id),
            });

        } else {

            const user = await User.create({
                name,
                email,
                regNo,
                dept,
                role
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    regNo: user.regNo,
                    dept: user.dept,
                    role: user.role,
                    token: generateToken(user._id)
                })
            } else {
                res.status(400);
                throw new Error('Invalid User Data');
            }
        }

    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

const submitAnswer = asyncHandler(async (req, res) => {
    const { answers } = req.body;

    var score = 0;
    var coreScore = 0;
    var aptitudeScore = 0;
    var verbalScore = 0;
    var codingScore = 0;

    answers.map((e) => {
        if (e.correctAnswer === e.userAnswer) {
            score = score + 1;
            if (e.questionCategory === 'Aptitude') {
                aptitudeScore = aptitudeScore + 1;
            } else if (e.questionCategory === 'Verbal') {
                verbalScore = verbalScore + 1;
            } else if (e.questionCategory === 'Coding') {
                codingScore = codingScore + 1;
            } else if (e.questionCategory === 'Core') {
                coreScore = coreScore + 1;
            }
        }
    });

    const newUserAnswer = await UserAnswer.create({
        name: req.user.name,
        regNo: req.user.regNo,
        dept: req.user.dept,
        userId: req.user._id,
        answers: answers,
        totalScore: score,
        aptitudeScore,
        verbalScore,
        codingScore,
        coreScore,
    });

    if (newUserAnswer) {
        res.json(newUserAnswer);
    } else {
        res.status(400);
        throw new Error('Error submitting answers');
    }


});


const getResult = asyncHandler(async (req, res) => {

    const result = await UserAnswer.find({ regNo: req.user.regNo });

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400);
        throw new Error('Resource Not Found');
    }

});

const createFeedback = asyncHandler(async (req, res) => {
    try {

        const { review, rating, difficulty } = req.body;
        const feedback = await UserFeedback.create({
            regNo: req.user.regNo,
            review,
            rating,
            difficulty
        });

        if (feedback) {
            res.json(feedback);
        }

    } catch (error) {
        res.status(400);
        throw new Error(error);
    }

});

const getFeedback = asyncHandler(async (req, res) => {
    try {

        const userFeedback = await UserFeedback.find({ regNo: req.user.regNo });

        if (userFeedback) {
            res.status(200).json(userFeedback);
        }

    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

const getLeaderBoard = asyncHandler(async (req, res) => {

    try {
        const { scoreList } = await UserAnswer.find({});

        var sortedLeaderboard = [];

        sortedLeaderboard = scoreList.totalScore.sort();

        res.status(200).json({ sortedLeaderboard });

    } catch (error) {
        res.status(400);
        throw new Error(error);
    }

})

module.exports = { registerUser, submitAnswer, getResult, createFeedback, getFeedback, getLeaderBoard }