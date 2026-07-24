import { api } from './api';
import type { AuthResponse, Role } from '@/types';

export const authService = {
  signup: (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: Role;
    campusId: string;
  }) => api.post<AuthResponse>('/auth/signup', payload).then((r) => r.data),

  login: (payload: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', payload).then((r) => r.data),

  verifyOtp: (payload: { phone: string; code: string }) =>
    api.post<AuthResponse>('/auth/verify-otp', payload).then((r) => r.data),
};
