import { create } from 'zustand';

type ColorScheme = 'light' | 'dark' | 'system';

interface ThemeState {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  colorScheme: 'system',
  setColorScheme: (scheme) => set({ colorScheme: scheme }),
}));
