import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "./hooks/useLogin";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const { handleLogin } = useLogin(email, password);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleLogin();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });
  
    return (
        <div className="app">
            <div className="login-container">
                    <h2>Login</h2>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin} style={{ cursor: "pointer" }}>Login</button>
                    <button onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>Create Account</button>
                    <button onClick={() => navigate("/app")} style={{ cursor: "pointer" }}>Continue without logging in</button>
            </div>
        </div>
    );
};

export default Login;