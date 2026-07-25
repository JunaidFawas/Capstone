/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { Platform } from 'react-native';
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
export const AuthColors = {
  background: '#FFF4EA',
  surface: '#FFFFFF',
  primary: '#EB7449',
  primaryPressed: '#D9653E',
  primarySoft: '#FFE2D4',
  heading: '#1D1D1D',
  body: '#7A7A7A',
  border: '#BDBDBD',
  borderStrong: '#535353',
  accent: '#FF6B3D',
  muted: '#9C9C9C',
  inputFill: '#FFFFFF',
  checkbox: '#FF6B3D',
  divider: '#1F1F1F',
  overlay: 'rgba(255, 255, 255, 0.18)',
};
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
export const AuthFonts = Platform.select({
  ios: {
    display: 'Avenir Next',
    body: 'Avenir Next',
    button: 'Avenir Next',
  },
  android: {
    display: 'sans-serif-medium',
    body: 'sans-serif',
    button: 'sans-serif-medium',
  },
  web: {
    display: "'Avenir Next', 'Segoe UI', Helvetica, Arial, sans-serif",
    body: "'Avenir Next', 'Segoe UI', Helvetica, Arial, sans-serif",
    button: "'Avenir Next', 'Segoe UI', Helvetica, Arial, sans-serif",
  },
  default: {
    display: 'sans-serif-medium',
    body: 'sans-serif',
    button: 'sans-serif-medium',
  },
});
