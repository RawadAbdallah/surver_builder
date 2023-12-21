const express = require("express");
const cors=require('cors')
const { connectToMongoDB } = require("./configs/mongodb.config");
const { authMiddleware } = require("./middlewares/auth.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
    console.log("home");
});

const authRoutes = require('./routes/auth.routes')
app.use("/auth", authRoutes);

const questionsRoutes = require('./routes/questions.routes');
app.use('/question', authMiddleware, questionsRoutes)

const surveyRoutes = require('./routes/surveys.routes')
app.use('/survey', authMiddleware, surveyRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server listining on PORT: ", process.env.PORT);
    connectToMongoDB();
});
