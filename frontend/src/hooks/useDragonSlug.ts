import { useState, useEffect } from "react";
import api from "../axios";

const useDragonSlug = (slugs: string[]) => {
  const [dataMap, setDataMap] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validSlugs = slugs.filter(Boolean);
    if (validSlugs.length === 0) return;

    const fetchDragons = async () => {
      setLoading(true);
      setError(null);

      try {
        const results: Record<string, any> = {};
        await Promise.all(
          validSlugs.map(async (slug) => {
            const response = await api.get("/dragon-slug", { params: { slug } });
            results[slug] = response.data;
          })
        );
        setDataMap(results);
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDragons();
  }, [JSON.stringify(slugs)]);

  return { dataMap, loading, error };
};

export default useDragonSlug;