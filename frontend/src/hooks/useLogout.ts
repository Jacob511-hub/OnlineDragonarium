import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

const useLogout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await api.get('/profile');;
                if (res.data.user) setIsLoggedIn(true);
            } catch (err) {
                setIsLoggedIn(false);
            }
            };
        checkSession();
    }, []);
    
    const handleLogout = async () => {
        await api.post('/logout', {});
        setIsLoggedIn(false);
        navigate("/login");
    };

    return { isLoggedIn, handleLogout };
};

export default useLogout;