import { useState, useEffect, useMemo } from "react";
import api from "../axios";
import useTraitCountStore from "./useTraitCountStore";
import useTraitStateStore from "./useTraitStateStore";

interface UseTraitStateProps {
  user_id: string;
  dragon_id: number;
  trait_id: number | null;
}

interface TraitStateHandler {
  get: () => Promise<boolean>;
  set: (newState: boolean) => Promise<void>;
}

const createAPIHandler = ({ user_id, dragon_id, trait_id }: UseTraitStateProps): TraitStateHandler => ({
  get: async () => {
    const response = await api.get('/user-traits',{
      params: { user_id, dragon_id, trait_id }
    });
    return response.data?.[0]?.unlocked === true || response.data?.[0]?.unlocked === "true";
  },
  set: async (newState: boolean) => {
    await api.patch(
      '/user-traits',
      { user_id, dragon_id, trait_id, unlocked: newState }
    );
  },
});

const createLocalStorageHandler = ({ user_id, dragon_id, trait_id }: UseTraitStateProps): TraitStateHandler => {
  const storageKey = `trait_${user_id}_${dragon_id}_${trait_id}`;

  return {
    get: async () => {
      const storedValue = localStorage.getItem(storageKey);
      return storedValue === "true";
    },
    set: async (newState: boolean) => {
      localStorage.setItem(storageKey, newState.toString());
    },
  };
};

const useTraitState = ({ user_id, dragon_id, trait_id }: UseTraitStateProps) => {
  const [isOn, setIsOn] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { increment, decrement } = useTraitCountStore();
  const { getTrait, setTrait } = useTraitStateStore();

  const traitKey = useMemo(() => `${user_id}_${dragon_id}_${trait_id}`, [user_id, dragon_id, trait_id]);
  const traitCountKey = `${user_id}_${dragon_id}`;

  const handler = useMemo(() => {
    return (user_id === "guest" || trait_id === null)
      ? createLocalStorageHandler({ user_id, dragon_id, trait_id })
      : createAPIHandler({ user_id, dragon_id, trait_id });
  }, [user_id, dragon_id, trait_id]);

  useEffect(() => {
    const fetchTraitState = async () => {
      const cachedState = getTrait(traitKey);

      if (cachedState !== undefined) {
        setIsOn(cachedState);
        return;
      }

      if (user_id !== "guest") return;
      
      try {
        const state = await handler.get();
        setIsOn(state);
      } catch (err) {
        setError("Error fetching trait state");
        console.error('Error fetching trait state:', err);
      }
    };

    fetchTraitState();
  }, [getTrait, handler, traitKey, user_id]);

  const toggleTraitState = async () => {
    if (isOn === null) return;

    const newState = !isOn;
    setIsOn(newState);
    setTrait(traitKey, newState);

    try {
      await handler.set(newState);
      if (newState) {
        increment(traitCountKey);
      } else {
        decrement(traitCountKey);
      }
    } catch (err) {
      setIsOn(!newState); // Revert state if update fails
      setTrait(traitKey, !newState);
      console.error('Error updating trait state:', err);
    }
  };

  return { isOn, error, toggleTraitState };
};

export default useTraitState;