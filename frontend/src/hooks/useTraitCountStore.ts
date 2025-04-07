import { create } from 'zustand';

interface TraitCountStore {
  traitCounts: Record<string, number>; // key = `${user_id}_${dragon_id}`
  setCount: (key: string, count: number) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
}

const useTraitCountStore = create<TraitCountStore>((set) => ({
  traitCounts: {},
  setCount: (key, count) => set(state => ({
    traitCounts: { ...state.traitCounts, [key]: count }
  })),
  increment: (key) => set(state => ({
    traitCounts: {
      ...state.traitCounts,
      [key]: (state.traitCounts[key] || 0) + 1
    }
  })),
  decrement: (key) => set(state => ({
    traitCounts: {
      ...state.traitCounts,
      [key]: Math.max((state.traitCounts[key] || 1) - 1, 0)
    }
  })),
}));

export default useTraitCountStore;