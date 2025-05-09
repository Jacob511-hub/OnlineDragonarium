import { useEffect, useState, useMemo } from "react";
import api from "../axios";
import useDragonCountsStore from "./useDragonCountsStore";

interface UseDragonCountsProps {
  user_id: string;
  dragon_id: number;
}

interface DragonCounts {
  count_normal: number;
  count_traited: number;
  count_twin: number;
  count_traited_twin: number;
}

const defaultCounts: DragonCounts = {
  count_normal: 0,
  count_traited: 0,
  count_twin: 0,
  count_traited_twin: 0,
};

const getLocalStorageKey = (user_id: string, dragon_id: number) =>
  `dragon_counts_${user_id}_${dragon_id}`;

const createAPIHandler = ({ user_id, dragon_id }: UseDragonCountsProps) => ({
  get: async (): Promise<DragonCounts> => {
    const response = await api.get("/user-counts", {
      params: { user_id, dragon_id },
    });

    const data = response.data?.[0];

    return {
      count_normal: Number(data?.normal_count ?? 0),
      count_traited: Number(data?.traited_count ?? 0),
      count_twin: Number(data?.twin_count ?? 0),
      count_traited_twin: Number(data?.traited_twin_count ?? 0),
    };
  },
  set: async (counts: DragonCounts) => {
    await api.patch("/user-counts", {
      dragon_id,
      ...counts,
    });
  },
});

const createLocalStorageHandler = ({ user_id, dragon_id }: UseDragonCountsProps) => {
  const key = getLocalStorageKey(user_id, dragon_id);

  return {
    get: async (): Promise<DragonCounts> => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultCounts;
    },
    set: async (counts: DragonCounts) => {
      localStorage.setItem(key, JSON.stringify(counts));
    },
  };
};

const useDragonCounts = ({ user_id, dragon_id }: UseDragonCountsProps) => {
  const [error, setError] = useState<string | null>(null);

  const { dragonCounts, getCounts, setCounts } = useDragonCountsStore();

  const key = useMemo(() => `${user_id}_${dragon_id}`, [user_id, dragon_id]);
  const handler = useMemo(() => {
    return user_id === "guest"
      ? createLocalStorageHandler({ user_id, dragon_id })
      : createAPIHandler({ user_id, dragon_id });
  }, [user_id, dragon_id]);

  const counts = dragonCounts[key] || defaultCounts;

  useEffect(() => {
    const fetchCounts = async () => {
        const cached = getCounts(key);
        if (cached) {
          setCounts(key, cached);
          return;
        }

        try {
            const data = await handler.get();
            setCounts(key, data);
        } catch (err) {
            setError("Error fetching dragon counts");
            console.error(err);
        }
    };
    fetchCounts();
  }, [getCounts, setCounts, handler, key]);

  const updateCount = (countKey: keyof DragonCounts, value: number) => {
    const updated = { ...counts, [countKey]: value };
    setCounts(key, updated);

    handler.set(updated).catch((err) => {
      console.error("Error updating dragon counts:", err);
      setError("Error updating dragon counts");
    });
  };

  return {
    counts,
    error,
    updateCount,
  };
};

export default useDragonCounts;