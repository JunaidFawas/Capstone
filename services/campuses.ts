import { api } from './api';
import type { Campus } from '@/types';

export const campusesService = {
  list: () => api.get<Campus[]>('/campuses').then((r) => r.data),
};
