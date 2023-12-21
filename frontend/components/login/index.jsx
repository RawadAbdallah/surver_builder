/* eslint-disable react/prop-types */
import { useState } from "react";
import { request } from "../../helpers/request";

const Login = ({ handleToggle }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
        try {
            const user = { email, password };
            await request("/auth/login", "POST", user);
        } catch (e) {
            console.log("Error: ", e);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <label htmlFor="login-email">Email:</label>
            <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="login-password">Password:</label>
            <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            <p>
                Don{"'"}t have an account?{" "}
                <span className="toggle-link" onClick={handleToggle}>
                    Register now
                </span>
            </p>
        </form>
    );
};

export default Login;
