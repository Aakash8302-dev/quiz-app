const asyncHandler = require("express-async-handler");
const Question = require("../models/questionModel.js");
const UserAnswer = require("../models/userAnswerModel.js");


const createQuestion = asyncHandler(async (req, res) => {
    try {
        const {
            questionDept,
            questionSet,
            questionTitle,
            questionCategory,
            options,
            correctAnswer,
            imageUrl
        } = req.body

        var userAnswer = null

        const questionCreated = await Question.create({
            questionDept,
            questionSet,
            questionTitle,
            questionCategory,
            options,
            correctAnswer,
            userAnswer,
            imageUrl
        })

        if (questionCreated) {
            res.status(201).json({ message: "Question Created Succcesfully" })
        }

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

const getQuestionById = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);

    if (question) {
        res.json(question);
    } else {
        res.status(404);
        throw new Error('Quesion not Found');
    }
})

const updateQuestion = asyncHandler(async (req, res) => {
    const { questionDept, questionSet, questionTitle, options, correctAnswer, imageUrl } =
        req.body;

    const questionFound = await Question.findById(req.params.id);

    if (questionFound) {
        (questionFound.correctAnswer = correctAnswer),
            (questionFound.questionDept = questionDept),
            (questionFound.questionSet = questionSet),
            (questionFound.questionTitle = questionTitle),
            (questionFound.questionCategory = questionCategory),
            (questionFound.options = options),
            (questionFound.imageUrl = imageUrl);

        const updatedQuestion = await questionFound.save();

        res.status(204).json({ message: "Question Updated Successfully" });


    } else {
        res.status(404);
        throw new Error('Question not found');
    }
})

const deleteQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);

    if (question) {
        await question.remove();
        res.json({ message: 'question Removed' });
    } else {
        res.status(400);
        throw new Error('Question not found');
    }
});

const getTestQuestions = asyncHandler(async (req, res) => {

    let regNo = req.user.regNo;

    let num = String(regNo).slice(-1);
    num = Number(num);

    num = num / 3;

    let setNumber = Math.ceil(num);
    setNumber = String(setNumber);

    let questions = [];

    const coreQuestion = await Question.find({ $and: [{ questionCategory: "Core" }, { questionDept: req.user.dept }] });
    var aptitudeQuestion = await Question.find({ $and: [{ questionCategory: "Aptitude" }, { questionSet: setNumber }] });
    var verbalQuestion = await Question.find({ $and: [{ questionCategory: "Verbal" }, { questionSet: setNumber }] });
    var codingQuestion = await Question.find({ $and: [{ questionCategory: "Coding" }, { questionSet: setNumber }] });

    questions = aptitudeQuestion;
    questions = questions.concat(verbalQuestion);
    questions = questions.concat(codingQuestion);
    questions = questions.concat(coreQuestion);

    if (questions) {
        res.json(questions);
    } else {
        res.status(400);
        throw new Error("questions not found");
    }

});

const getAllQuestions = asyncHandler(async (req, res) => {
    try {
        const questions = await Question.find({})

        res.json(questions)

    } catch (error) {
        throw new Error(error);
    }
});

const submitAnswers = asyncHandler(async (req, res) => {
    try {

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
            dept: req.user.dept,
            regNo: req.user.regNo,
            userId: req.user._id,
            totalScore: score,
            aptitudeScore,
            verbalScore,
            codingScore,
            coreScore,
            answers
        });

        if (newUserAnswer) {
            res.status(201).json({
                message: "Answer Submitted Successfully",
            })
        }


    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
})

module.exports = { createQuestion, getQuestionById, updateQuestion, deleteQuestion, getTestQuestions, getAllQuestions, submitAnswers }