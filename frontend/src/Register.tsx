import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "./hooks/useRegister";


const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const { handleRegister } = useRegister(username, email, password);

    useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                    handleRegister();
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
                <h2>Create Account</h2>
                <input className="login-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="login-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button
                    className='button-default'
                    style={{ width: '150px' }}
                    onClick={handleRegister}
                >Register</button>
                <button
                    className='button-default'
                    style={{ width: '150px' }}
                    onClick={() => navigate("/app")}
                >Back</button>
            </div>
        </div>
    );
};

export default Register;