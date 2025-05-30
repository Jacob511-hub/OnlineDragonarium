import { useNavigate } from "react-router-dom";
import api from "../axios";

const useLogin = (email: string, password: string) => {
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      try {
        await api.post('/login', { email, password });
        navigate("/app");
      } catch (err) {
        alert("Login failed");
      }
    };

    return { handleLogin };
};

export default useLogin;