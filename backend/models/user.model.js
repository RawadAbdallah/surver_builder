const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        minlength: [3, "Email must be at least 3 characters."],
        maxlength: [20, "Email must be at most 20 characters."],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least 6 characters."],
    },
    firstname: {
        type: String,
        required: [true, "First name is required."],
        minlength: [2, "First name must be at least 6 characters."],
    },
    lastname: {
        type: String,
        required: [true, "Last name is required."],
        minlength: [2, "Last name must be at least 6 characters."],
    },

    role: {
        type: Number,
        default: 1, 
    }
});

userSchema.pre("save", function (next) {
    const validationErrors = this.validateSync();
    if (validationErrors) {
        const firstErrorKey = Object.keys(validationErrors.errors)[0];
        const firstErrorMessage =
            validationErrors.errors[firstErrorKey].message;
        next(new Error(firstErrorMessage));
    } else {
        next();
    }
});

userSchema.pre(
    "save",
    async function (next) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
