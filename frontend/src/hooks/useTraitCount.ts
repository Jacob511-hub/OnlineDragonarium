import { useEffect, useMemo } from "react";
import api from "../axios";
import useTraitCountStore from "./useTraitCountStore";
import useTraitListStore from "./useTraitListStore";

interface UseTraitStateProps {
  user_id: string;
  dragon_id: number;
}

interface TraitStateHandler {
  get: () => Promise<Array<boolean>>;
}

const createAPIHandler = ({ user_id, dragon_id }: UseTraitStateProps): TraitStateHandler => ({
    get: async () => {
      const response = await api.get('/user-dragon-traits', {
        params: { user_id, dragon_id }
      });
  
      const traits = response.data;
  
      if (!Array.isArray(traits)) return [];
  
      return traits.map(trait => trait.unlocked === true || trait.unlocked === "true");
    }
});

const createLocalStorageHandler = ({ user_id, dragon_id }: UseTraitStateProps): TraitStateHandler => {
    const storageKeys = Array.from({ length: 10 }, (_, i) => {
      const trait_id = i + 1;
      return `trait_${user_id}_${dragon_id}_${trait_id}`;
    });
  
    return {
      get: async () => {
        return storageKeys.map(key => localStorage.getItem(key) === "true");
      }
    };
};

const useTraitCount = ({ user_id, dragon_id }: UseTraitStateProps) => {
    const { traitCounts, setCount } = useTraitCountStore();
    const { getTraits, setTraits } = useTraitListStore();

    const key = `${user_id}_${dragon_id}`;
    const count = traitCounts[key] || 0;

    const handler = useMemo(() => {
      return user_id === "guest"
        ? createLocalStorageHandler({ user_id, dragon_id })
        : createAPIHandler({ user_id, dragon_id });
    }, [user_id, dragon_id]);

    useEffect(() => {
        const fetchCount = async () => {
          const cached = getTraits(key);

          if (cached !== undefined) {
              setCount(key, cached.filter(Boolean).length);
              return;
          }

          const traits = await handler.get();
          setTraits(key, traits);
          setCount(key, traits.filter(Boolean).length);
        };

        fetchCount();
    }, [getTraits, handler, key, setCount, setTraits]);
    
    return count;
};

export default useTraitCount;