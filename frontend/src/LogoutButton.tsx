import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LogoutButton: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/profile`, { withCredentials: true });
                if (res.data.user) setIsLoggedIn(true);
            } catch (err) {
                setIsLoggedIn(false);
            }
            };
            checkSession();
        }, []);
    
        const handleLogout = async () => {
            await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
            setIsLoggedIn(false);
            navigate("/login");
        };

    return (
        <div className="logout-button">
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={() => navigate("/login")}>Login</button>
            )}
        </div>
    );
}

export default LogoutButton;