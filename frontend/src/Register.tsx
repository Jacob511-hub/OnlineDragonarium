import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleRegister = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
        alert(res.data.message);
        navigate("/login");
      } catch (err) {
        alert("Registration failed");
      }
    };
  
    return (
        <div className="app">
            <div className="login-container">
                <h2>Create Account</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleRegister}>Register</button>
                <button onClick={() => navigate("/login")}>Back to Login</button>
            </div>
        </div>
    );
};

export default Register;