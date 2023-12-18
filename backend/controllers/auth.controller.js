const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    console.log(req)
    const { email, password } = req.body;
    console.log("Email is ", email)
    console.log("password is ", password)

    if(email === undefined){
        return res.status(401).send({ error: "Please provide an email" });
    }

    if(password === undefined){
        return res.status(400).send({error: "Please provide a password" })
    }
    const user = await User.findOne({ email });
    if (!user) res.status(400).send({ message: "Invalid email/password" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
        res.status(400).send({ message: "Invalid email/password" });

    const { password: hashedPassword, ...userDetails } = user.toJSON();

    const token = jwt.sign(
        {
            ...userDetails,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2 days" }
    );

    res.status(200).send({
        user: userDetails,
        token,
    });
};

const register = async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    

    try {
        const user = new User({
            email,
            password,
            firstname,
            lastname,
        });

        await user.save();

        res.status(200).send({ user });
    } catch (e) {
        res.status(500).send({ error: e });
    }
};

module.exports = {
    login,
    register,
};
