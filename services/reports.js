import { api } from './api';
export const reportsService = {
  create: (payload) => api.post('/reports', payload).then((r) => r.data),
};
