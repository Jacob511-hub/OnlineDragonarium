import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useLogin = (email: string, password: string) => {
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

    return { handleLogin };
};

export default useLogin;