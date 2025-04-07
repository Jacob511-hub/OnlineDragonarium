import { create } from 'zustand';

type TraitStateMap = Record<string, boolean>;

interface TraitStateStore {
  traitStates: TraitStateMap;
  getTrait: (key: string) => boolean | undefined;
  setTrait: (key: string, value: boolean) => void;
}

const useTraitStateStore = create<TraitStateStore>((set, get) => ({
  traitStates: {},
  getTrait: (key) => get().traitStates[key],
  setTrait: (key, value) =>
    set((state) => ({
      traitStates: {
        ...state.traitStates,
        [key]: value,
      },
    })),
}));

export default useTraitStateStore;