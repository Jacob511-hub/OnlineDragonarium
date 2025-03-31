import { useNavigate } from "react-router-dom";
import api from "../axios";

const useLogin = (email: string, password: string) => {
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      try {
        const res = await api.post('/login', { email, password });
        alert(res.data.message);
        navigate("/app");
      } catch (err) {
        alert("Login failed");
      }
    };

    return { handleLogin };
};

export default useLogin;