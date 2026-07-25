import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});
// Attach the stored token to every outgoing request.
api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.warn('api: failed to read stored token', e);
  }
  return config;
});
// Degrade gracefully on auth failures — this is NOT the enforcement
// mechanism (that must happen server-side, see SETUP-3), just a
// client-side safety net so the app doesn't hang on a stale session.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      router.replace('/(auth)/login');
    }
    return Promise.reject(error);
  },
);
