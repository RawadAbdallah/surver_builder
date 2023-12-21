const { mongoose } = require("mongoose");

const questionSchema = new mongoose.Schema({
    surveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey",
        required: true,
    },
    text: {
        type: String,
        required: [true, "Question text is required."],
        minlength: [3, "Question text must be at least 3 characters."],
        trim: true,
    },
    type: {
        type: String,
        enum: ["multiple-choice", "text", "single-choice"],
        default: "text",
    },
    options: {
        type: [String],
    },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = { Question };
