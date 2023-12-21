const express = require("express");
const {createQuestion, deleteQuestionById, updateQuestionById, getQuestionsForSurvey, getQuestionById} = require('../controllers/questions.controller')
const router = express.Router();

router.post("/add", createQuestion);
router.delete("/delete/:id", deleteQuestionById)
router.put("/edit/:id", updateQuestionById)
router.get("/:id", getQuestionById)
router.get("/survey/:id", getQuestionsForSurvey)

module.exports = router;
