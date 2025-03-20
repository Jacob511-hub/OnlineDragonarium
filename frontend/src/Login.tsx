import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "./hooks/useLogin";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const { handleLogin } = useLogin(email, password);
  
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