import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LogoutButton: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/profile`);
                if (res.data.user) setIsLoggedIn(true);
            } catch (err) {
                setIsLoggedIn(false);
            }
            };
            checkSession();
        }, []);
    
        const handleLogout = async () => {
            await axios.post(`${API_BASE_URL}/logout`);
            setIsLoggedIn(false);
            navigate("/login");
        };

    return (
        <div className="app">
            <h1>Welcome to the App</h1>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={() => navigate("/login")}>Login</button>
            )}
        </div>
    );
}

export default LogoutButton;