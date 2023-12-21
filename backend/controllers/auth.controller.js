const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const { email, password } = req.body;

    if (email === undefined) {
        return res.status(401).send({ message: "Please provide an email" });
    }

    if (password === undefined) {
        return res.status(400).send({ message: "Please provide a password" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "Invalid email/password" });

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
    const { email, password, firstName, lastName } = req.body;
    console.log({email,password,firstName,lastName})
    try {
        const user = new User({
            email,
            password,
            firstName,
            lastName,
        });

        await user.save();

        res.status(200).send({ user }); 
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

module.exports = {
    login,
    register,
};
