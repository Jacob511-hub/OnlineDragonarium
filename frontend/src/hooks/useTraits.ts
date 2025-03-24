import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Trait {
    id: number;
    name: string;
}

export const useTraits = () => {
    const [traits, setTraits] = useState<Trait[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const fetchTraits = async () => {
            try {
              const response = await axios.get(`${API_BASE_URL}/traits`);
              setTraits(response.data);
            } catch (err) {
              setError("Error fetching traits");
              console.error(err);
            }
          };
        fetchTraits();
    }, []);
  
    return { traits, error };
};
  
export default useTraits;