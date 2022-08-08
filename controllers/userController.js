const asyncHandler = require("express-async-handler")
const User = require('../models/userModel.js');
const UserAnswer = require('../models/userAnswerModel.js')
const UserFeedback = require('../models/userFeedbackModel.js');
const generateToken = require("../utils/generateToken.js");
const bcrypt = require('bcryptjs')


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
                role: exists.role,
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

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, regNo, dept, role, password } = req.body;

    const userExists = await User.findOne({ $and: [{ regNo }, { role }] });

    if (userExists) {
        res.status(403);
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        name,
        email,
        regNo,
        dept,
        role,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            regNo: user.regNo,
            dept: user.dept,
            password: user.password,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { regNo, password } = req.body;

    const role = "admin"

    const user = await User.findOne({ $and: [{ regNo }, { role }] });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            regNo: user.regNo,
            dept: user.dept,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid UserID or Password');
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
        const data = await UserAnswer.find();

        const sort = (arr) => {
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr.length - i - 1; j++) {
                    if (arr[j].totalScore < arr[j + 1].totalScore) {
                        var temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }

            return arr;
        };


        sortedLeaderboard = sort(data)

        if (sortedLeaderboard) {
            res.status(200).json(sortedLeaderboard);
        }


    } catch (error) {
        res.status(500).json({
            error: error.message
        });;
    }

})

const checkSubmission = asyncHandler(async (req, res) => {

    try {
        const answer = await UserAnswer.find({ regNo: req.user.regNo })

        if (answer.length > 0) {
            res.status(200).json({
                exists: "submitted",
                answer
            })
        } else {
            res.status(200).json({
                exists: "notSubmitted"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }


})

module.exports = { registerUser, registerAdmin, loginAdmin, submitAnswer, getResult, createFeedback, getFeedback, getLeaderBoard, checkSubmission }