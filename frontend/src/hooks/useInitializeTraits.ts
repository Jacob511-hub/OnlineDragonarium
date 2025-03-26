import { useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useInitializeTraits = () => {
    useEffect(() => {
        const initializeTraits = async () => {
            try {
                await axios.post(`${API_BASE_URL}/initialize-traits`, {}, { withCredentials: true });
            } catch (err) {
                console.error("Failed to initialize traits:", err);
            }
        };
    
        initializeTraits();
    }, []);
  };
  
  export default useInitializeTraits;