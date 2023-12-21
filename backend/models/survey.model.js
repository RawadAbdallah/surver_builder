const { mongoose } = require("mongoose");

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
        minlength: [3, "Title must be at least 3 characters."],
        trim: true,
    },
    description: {
        type: String,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;