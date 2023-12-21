// const { mangoose } = require("mongoose");

// const addAnswer = (req, res) => {
//     const {question_id, response} = req.body
//     const user = req.user
//     if (!user || user.role != 1) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const answerSchema = new mangoose.Schema({
//         questionId: String,
//         userId: user._id,

// }