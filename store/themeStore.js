import { create } from 'zustand';
export const useThemeStore = create((set) => ({
  colorScheme: 'system',
  setColorScheme: (scheme) => set({ colorScheme: scheme }),
}));
