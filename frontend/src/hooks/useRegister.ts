import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useRegister = (username: string, email: string, password: string) => {
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
            navigate("/login");
        } catch (err) {
            alert("Registration failed");
        }
    };

    return { handleRegister };
};

export default useRegister;