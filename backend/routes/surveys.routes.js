const express = require("express");
const router = express.Router();
const {
    createSurvey,
    deleteSurveyById,
    updateSurveyById,
    getAllSurveys,
    getSurveyById,
} = require("../controllers/survey.controller");

router.post("/new", createSurvey);
router.delete("/delete/:id", deleteSurveyById);
router.get("/", getAllSurveys);
router.get("/:id", getSurveyById);
router.put("/:id", updateSurveyById);

module.exports = router;
