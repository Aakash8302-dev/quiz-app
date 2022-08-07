const express = require("express");
const { createQuestion, getQuestionById, updateQuestion, deleteQuestion, getTestQuestions, submitAnswers, getCreatedQuestions } = require("../controllers/questionController.js")
const { protect, authAdmin } = require("../middlewares/authMiddleware.js")

const router = express.Router();

router.route('/').get(protect, getTestQuestions);

router.route('/all').get(protect, authAdmin, getCreatedQuestions)

router.route('/create')
    .post(protect, authAdmin, createQuestion)

router.route("/:id")
    .get(protect, authAdmin, getQuestionById)
    .put(protect, authAdmin, updateQuestion)
    .delete(protect, authAdmin, deleteQuestion);

router.route("/submit")
    .post(protect, submitAnswers)

module.exports = router