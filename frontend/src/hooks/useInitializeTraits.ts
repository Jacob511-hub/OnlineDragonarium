import { useEffect } from "react";
import api from "../axios";

const useInitializeTraits = () => {
    useEffect(() => {
        const initializeTraits = async () => {
            try {
                await api.post('/initialize-traits');
            } catch (err) {
                console.error("Failed to initialize traits:", err);
            }
        };
    
        initializeTraits();
    }, []);
};
  
export default useInitializeTraits;