import { api } from './api';
export const authService = {
  signup: (payload) => api.post('/auth/signup', payload).then((r) => r.data),
  login: (payload) => api.post('/auth/login', payload).then((r) => r.data),
  verifyOtp: (payload) => api.post('/auth/verify-otp', payload).then((r) => r.data),
};
