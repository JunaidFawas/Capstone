import { api } from './api';
import type { Listing, ListingFilters } from '@/types';

export const listingsService = {
  search: (filters: ListingFilters) =>
    api.get<Listing[]>('/listings', { params: filters }).then((r) => r.data),

  getById: (id: string) => api.get<Listing>(`/listings/${id}`).then((r) => r.data),

  create: (payload: Partial<Listing>) =>
    api.post<Listing>('/listings', payload).then((r) => r.data),

  update: (id: string, payload: Partial<Listing>) =>
    api.patch<Listing>(`/listings/${id}`, payload).then((r) => r.data),

  remove: (id: string) => api.delete(`/listings/${id}`),
};
