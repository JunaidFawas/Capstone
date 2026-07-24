import { create } from 'zustand';

interface SearchFilterState {
  campusId: string | null; // required, non-hardcoded — no default campus
  priceMin: number | null;
  priceMax: number | null;
  distanceKm: number | null;
  amenities: string[];
  setCampusId: (id: string) => void;
  setFilters: (partial: Partial<Omit<SearchFilterState, 'campusId'>>) => void;
  reset: () => void;
}

const initialFilters = {
  priceMin: null,
  priceMax: null,
  distanceKm: null,
  amenities: [] as string[],
};

export const useSearchFilterStore = create<SearchFilterState>((set) => ({
  campusId: null,
  ...initialFilters,
  setCampusId: (id) => set({ campusId: id }),
  setFilters: (partial) => set(partial),
  reset: () => set({ campusId: null, ...initialFilters }),
}));
