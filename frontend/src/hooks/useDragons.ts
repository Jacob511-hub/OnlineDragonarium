import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface DragonData {
    id: number;
    name: string;
    can_be_traited: boolean;
    elements: string[];
}

const useDragons = () => {
  const [dragons, setDragons] = useState<DragonData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDragons = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/dragons`);
        setDragons(response.data);
      } catch (err) {
        setError("Error fetching dragons");
        console.error(err);
      }
    };

    fetchDragons();
  }, []);

  return { dragons, error };
};

export default useDragons;