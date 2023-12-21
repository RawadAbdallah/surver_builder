const Survey = require("../models/survey.model");

const createSurvey = async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Please enter a title" });
    }

    if (req.user.role !== 0) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const survey = await Survey.create({
            title,
            description,
        });

        await survey.save();

        res.status(200).json({
            message: "Survey created successfully",
            survey,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find();

        res.json(surveys);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSurveyById = async (req, res) => {
    try {
        const { id } = req.params;
        const survey = await Survey.findById(id);
        const user = req.user;

        if (!survey) {
            return res.status(404).json({ error: "Survey not found" });
        }

        if (!user || user.role !== 0) {
            return res
                .status(403)
                .json({
                    error: "Permission denied. Only admins can view survey details.",
                });
        }

        res.json(survey);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateSurveyById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const user = req.user
        if (user.role !== 0) {
            return res
                .status(403)
                .json({
                    error: "Permission denied. Only admins can update surveys.",
                });
        }

        const survey = await Survey.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!survey) {
            return res.status(404).json({ error: "Survey not found" });
        }

        res.status(200).json({message: "Survey updated", survey});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteSurveyById = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role !== 0) {
            return res
                .status(403)
                .json({
                    error: "Permission denied. Only admins can delete surveys.",
                });
        }

        const survey = await Survey.findByIdAndDelete(id);

        if (!survey) {
            return res.status(404).json({ error: "Survey not found" });
        }

        res.json({ message: "Survey deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createSurvey,
    getAllSurveys,
    getSurveyById,
    updateSurveyById,
    deleteSurveyById,
};
