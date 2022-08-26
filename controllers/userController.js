const asyncHandler = require("express-async-handler")
const User = require('../models/userModel.js');
const UserAnswer = require('../models/userAnswerModel.js')
const UserFeedback = require('../models/userFeedbackModel.js');
const generateToken = require("../utils/generateToken.js");
const bcrypt = require('bcryptjs')


const registerUser = asyncHandler(async (req, res) => {

    try {
        const { firstName,lastName, email, regNo, dept, role } = req.body;

        const exists = await User.findOne({ $and: [{ regNo }, { role }] });

        if (exists) {

            if(exists.login){
                throw new Error('User Already Logged In')
            }else{

                const newValue = {$set : {login: true}}
                await User.updateOne({ _id : exists._id}, newValue)

                const loggedInUser = await User.findById(exists._id)

                res.json({
                    _id: loggedInUser._id,
                    firstName: loggedInUser.firstName,
                    lastName: loggedInUser.lastName,
                    regNo: loggedInUser.regNo,
                    email: loggedInUser.email,
                    dept: loggedInUser.dept,
                    role: loggedInUser.role,
                    login: loggedInUser.login,
                    token: generateToken(loggedInUser._id),
                });
            }

        } else {

            const user = await User.create({
                firstName,
                lastName,
                email,
                regNo,
                dept,
                role,
                login: true
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    regNo: user.regNo,
                    dept: user.dept,
                    role: user.role,
                    login: user.login,
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

const logoutUser = asyncHandler(async (req, res) => {
    try {

        const newValue = {$set : {login: false}}
        await User.updateOne({ _id : req.user._id}, newValue)

        const loggedOutUser = await User.findById(req.user._id);

        if (loggedOutUser) {

            res.status(201).json({
                _id: loggedOutUser._id,
                firstName: loggedOutUser.firstName,
                lastName: loggedOutUser.lastName,
                email: loggedOutUser.email,
                regNo: loggedOutUser.regNo,
                dept: loggedOutUser.dept,
                role: loggedOutUser.role,
                login: loggedOutUser.login,
            })

        }else{
            throw new Error("Logout Failed")
        }

    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

const registerAdmin = asyncHandler(async (req, res) => {
    const { firstName,lastName, email, regNo, dept, role, password } = req.body;

    const userExists = await User.findOne({ $and: [{ regNo }, { role }] });

    if (userExists) {
        res.status(403);
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        regNo,
        dept,
        role,
        password,
        login: true
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            regNo: user.regNo,
            dept: user.dept,
            password: user.password,
            role: user.role,
            login: user.login,
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
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            regNo: user.regNo,
            dept: user.dept,
            role: user.role,
            password: user.password,
            login: user.login,
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
        firstName: req.user.firstName,
        lastName: req.user.lastName,
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

module.exports = { registerUser,logoutUser, registerAdmin, loginAdmin, submitAnswer, getResult, createFeedback, getFeedback, getLeaderBoard, checkSubmission }