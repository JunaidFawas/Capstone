import { createContext, useContext } from 'react';

export const AuthKeyboardContext = createContext({
  scrollToField: null,
});

export function useAuthKeyboard() {
  return useContext(AuthKeyboardContext);
}
