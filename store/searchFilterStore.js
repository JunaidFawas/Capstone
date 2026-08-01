import { create } from 'zustand';
import { DEFAULT_PROPERTY_FILTERS } from '@/constants/properties';

const initialFilters = {
  ...DEFAULT_PROPERTY_FILTERS,
};

export const useSearchFilterStore = create((set) => ({
  campusId: null,
  ...initialFilters,
  setCampusId: (id) => set({ campusId: id }),
  setFilters: (partial) => set((state) => ({ ...state, ...partial })),
  reset: () => set({ campusId: null, ...initialFilters }),
}));
