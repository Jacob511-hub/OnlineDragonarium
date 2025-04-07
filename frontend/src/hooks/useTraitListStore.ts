import { create } from 'zustand';

interface TraitListStore {
    traitMap: Record<string, boolean[]>; // key = `${user_id}_${dragon_id}`
    getTraits: (key: string) => boolean[] | undefined;
    setTraits: (key: string, traits: boolean[]) => void;
}
  
const useTraitListStore = create<TraitListStore>((set, get) => ({
traitMap: {},
    getTraits: (key) => get().traitMap[key],
    setTraits: (key, traits) =>
        set((state) => ({
        traitMap: {
            ...state.traitMap,
            [key]: traits,
        },
    })),
}));
  
  export default useTraitListStore;