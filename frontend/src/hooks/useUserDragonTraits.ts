import { useEffect, useState } from "react";
import api from "../axios";
import useTraitStateStore from "./useTraitStateStore";

const useUserDragonTraits = (user_id: string, dragon_id: number) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { setTrait } = useTraitStateStore();

  useEffect(() => {
    const fetchAllTraits = async () => {
      if (user_id === "guest") {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/user-dragon-traits", {
          params: { user_id, dragon_id },
        });

        res.data.forEach((trait: { trait_id: number; unlocked: boolean }) => {
          const key = `${user_id}_${dragon_id}_${trait.trait_id}`;
          setTrait(key, trait.unlocked);
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user dragon traits");
        console.error("Error loading dragon traits:", err);
      }
    };

    fetchAllTraits();
  }, [user_id, dragon_id, setTrait]);

  return { error, loading };
};

export default useUserDragonTraits;