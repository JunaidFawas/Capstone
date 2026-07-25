import { create } from 'zustand';
const initialFilters = {
  priceMin: null,
  priceMax: null,
  distanceKm: null,
  amenities: [],
};
export const useSearchFilterStore = create((set) => ({
  campusId: null,
  ...initialFilters,
  setCampusId: (id) => set({ campusId: id }),
  setFilters: (partial) => set(partial),
  reset: () => set({ campusId: null, ...initialFilters }),
}));
