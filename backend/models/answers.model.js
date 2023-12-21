const { mongoose } = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  response: {
    type: String,
  },
});

const Answer = mongoose.model("Answer", answerSchema)

module.exports = { Answer }