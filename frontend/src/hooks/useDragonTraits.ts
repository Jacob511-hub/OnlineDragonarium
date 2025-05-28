import { useEffect, useState } from "react";
import api from "../axios";
import useTraitStateStore from "./useTraitStateStore";

const useDragonTraits = (user_id: string, dragon_id: number, can_be_traited: boolean) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setTrait } = useTraitStateStore();

  useEffect(() => {
    const fetchAllTraits = async () => {
      if (user_id === "guest" || !can_be_traited) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/user-dragon-traits", {
          params: { user_id, dragon_id },
        });

        const traits = response.data;
        traits.forEach((trait: any) => {
          const key = `${user_id}_${dragon_id}_${trait.trait_id}`;
          setTrait(key, trait.unlocked === true || trait.unlocked === "true");
        });
      } catch (err) {
        console.error("Failed to load traits:", err);
        setError("Failed to load traits");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTraits();
  }, [user_id, dragon_id, setTrait]);

  return { loading, error };
};

export default useDragonTraits;