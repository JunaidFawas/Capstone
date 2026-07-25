import { api } from './api';
export const campusesService = {
  list: () => api.get('/campuses').then((r) => r.data),
};
