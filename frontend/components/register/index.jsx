/* eslint-disable react/prop-types */
import { useState } from "react";
import {request} from "../../helpers/request";

const Register = ({ handleToggle }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Registering with:", firstName, lastName, email, password);
        try {
            const user={firstName,lastName,email,password};
            await request("/auth/register","POST" ,user);
        } catch (e) {
            console.log("Error: ", e);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleRegister}>
            <h2>Register</h2>
            <label htmlFor="register-firstname">First Name:</label>
            <input
                type="text"
                id="register-firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <label htmlFor="register-lastname">Last Name:</label>
            <input
                type="text"
                id="register-lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <label htmlFor="register-email">Email:</label>
            <input
                type="email"
                id="register-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="register-password">Password:</label>
            <input
                type="password"
                id="register-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
            <p>
                Already have an account?{" "}
                <span className="toggle-link" onClick={handleToggle}>
                    Login now
                </span>
            </p>
        </form>
    );
};

export default Register;
