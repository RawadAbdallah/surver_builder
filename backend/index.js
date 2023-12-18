const express = require("express");
const { connectToMongoDB } = require("./configs/mongodb.config");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    console.log("home");
});

const authRoutes = require('./routes/auth.routes')
app.use("/auth", authRoutes);

app.listen(8000, () => {
    console.log("Server listining on PORT: ", 8000);
    connectToMongoDB();
});
