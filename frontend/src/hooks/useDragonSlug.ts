import { useState, useEffect } from "react";
import api from "../axios";

const useDragonSlug = (slug: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchDragon = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/dragon-slug", {
          params: { slug },
        });
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDragon();
  }, [slug]);

  return { data, loading, error };
};

export default useDragonSlug;