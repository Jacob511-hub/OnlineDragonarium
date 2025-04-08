import { create } from 'zustand';

interface DragonCounts {
  count_normal: number;
  count_traited: number;
  count_twin: number;
  count_traited_twin: number;
}

type DragonCountsMap = Record<string, DragonCounts>;

interface DragonCountsStore {
  dragonCounts: DragonCountsMap;
  getCounts: (key: string) => DragonCounts | undefined;
  setCounts: (key: string, counts: DragonCounts) => void;
}

const useDragonCountsStore = create<DragonCountsStore>((set, get) => ({
  dragonCounts: {},
  getCounts: (key) => get().dragonCounts[key],
  setCounts: (key, counts) =>
    set((state) => ({
      dragonCounts: {
        ...state.dragonCounts,
        [key]: counts,
      },
    })),
}));

export default useDragonCountsStore;
