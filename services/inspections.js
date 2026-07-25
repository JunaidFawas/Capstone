import { api } from './api';
export const inspectionsService = {
  create: (listingId, payload) =>
    api.post(`/listings/${listingId}/inspection-requests`, payload).then((r) => r.data),
  update: (id, payload) => api.patch(`/inspection-requests/${id}`, payload).then((r) => r.data),
  listMine: () => api.get('/inspection-requests', { params: { mine: true } }).then((r) => r.data),
};
