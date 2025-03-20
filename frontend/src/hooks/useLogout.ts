import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useLogout = () => {
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

    return { isLoggedIn, handleLogout };
};

export default useLogout;