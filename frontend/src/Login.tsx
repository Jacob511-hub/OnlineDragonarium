import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/login`, { email, password }, { withCredentials: true });
        alert(res.data.message);
        navigate("/app");
      } catch (err) {
        alert("Login failed");
      }
    };
  
    return (
        <div className="app">
            <div className="login-container">
                    <h2>Login</h2>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={() => navigate("/register")}>Create Account</button>
                    <button onClick={() => navigate("/app")}>Continue without logging in</button>
            </div>
        </div>
    );
};

export default Login;