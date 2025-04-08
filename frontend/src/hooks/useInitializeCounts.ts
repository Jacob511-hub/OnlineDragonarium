import { useEffect } from "react";
import api from "../axios";

const useInitializeCounts = () => {
    useEffect(() => {
        const initializeCounts = async () => {
            try {
                await api.post('/initialize-counts');
            } catch (err) {
                console.error("Failed to initialize counts:", err);
            }
        };
    
        initializeCounts();
    }, []);
};
  
export default useInitializeCounts;