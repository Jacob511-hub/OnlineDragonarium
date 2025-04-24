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
        <div className="login">
            <div className="login-container">
                    <h2>Login</h2>
                    <input className="login-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button
                        className='button-default'
                        style={{ width: '150px' }}
                        onClick={handleLogin}
                    >Login</button>
                    <button
                        className='button-default'
                        style={{ width: '150px' }}
                        onClick={() => navigate("/register")}
                    >Create Account</button>
                    <button
                        className='button-default'
                        style={{ width: '150px' }}
                        onClick={() => navigate("/app")}
                    >Continue without logging in</button>
            </div>
        </div>
    );
};

export default Login;