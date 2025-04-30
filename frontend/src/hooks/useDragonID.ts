import { useState, useEffect } from "react";
import api from "../axios";

const useDragonID = (id: number) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDragon = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/dragon-id", {
          params: { id },
        });
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDragon();
  }, [id]);

  return { data, loading, error };
};

export default useDragonID;