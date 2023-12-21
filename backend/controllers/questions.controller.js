const { Question } = require("../models/question.model");
const Survey = require("../models/survey.model");
const createQuestion = async (req, res) => {
    const { text, type, options, surveyId } = req.body;
    const user = req.user;
    if (!user || user.role != 0) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        if (!text || !type || !surveyId) {
            return res.status(400).json({ message: "Missing fields" });
        }

        if (type !== "text" && !options) {
            return res.status(400).json({
                message: "Options field is required for non-text questions.",
            });
        }

        const question = await Question.create({
            surveyId,
            text,
            type,
            options,
        });

        const survey = await Survey.findByIdAndUpdate(
            surveyId,
            { $push: { questions: question._id } },
            { new: true }
        );

        if (!survey) {
            return res.status(404).json({ message: "Survey not found" });
        }

        return res
            .status(200)
            .json({ message: "Question added successfully", question });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Something went wrong...", error });
    }
};

const getQuestionsForSurvey = async (req, res) => {
    try {
        const { survey_id } = req.params;

        const questions = await Question.find({ survey_id });

        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findById(id);

        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateQuestionById = async (req, res) => {
    const user = req.user;
    if (!user || user.role != 0) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const { id } = req.params;
        const { text, type, options } = req.body;

        const question = await Question.findByIdAndUpdate(
            id,
            { text, type, options },
            { new: true, runValidators: true }
        );

        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.json({ message: "Question updated", question });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findByIdAndDelete(id);

        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        let survey = await Survey.findOne({ questions: id })
        if(!survey){
            return res.status(404).json({ error: 'Survey Not Found'})
        }
        let index = survey.questions.indexOf(id);
        survey.questions.splice(index, 1);
        await survey.save();
        res.json({ message: "Question deleted" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createQuestion,
    getQuestionsForSurvey,
    getQuestionById,
    updateQuestionById,
    deleteQuestionById,
};
