import { useState, useEffect } from "react";
import axios from "axios";

interface DragonData {
    id: number;
    name: string;
    elements: string[];
  }

const useDragons = () => {
  const [dragons, setDragons] = useState<DragonData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDragons = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dragons");
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