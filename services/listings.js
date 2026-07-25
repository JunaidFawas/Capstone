import { api } from './api';
export const listingsService = {
  search: (filters) => api.get('/listings', { params: filters }).then((r) => r.data),
  getById: (id) => api.get(`/listings/${id}`).then((r) => r.data),
  create: (payload) => api.post('/listings', payload).then((r) => r.data),
  update: (id, payload) => api.patch(`/listings/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/listings/${id}`),
};
