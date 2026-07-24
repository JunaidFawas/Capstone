import { api } from './api';
import type { InspectionRequest } from '@/types';

export const inspectionsService = {
  create: (listingId: string, payload: { preferredDatetime: string }) =>
    api
      .post<InspectionRequest>(`/listings/${listingId}/inspection-requests`, payload)
      .then((r) => r.data),

  update: (id: string, payload: Partial<InspectionRequest>) =>
    api.patch<InspectionRequest>(`/inspection-requests/${id}`, payload).then((r) => r.data),

  listMine: () =>
    api
      .get<InspectionRequest[]>('/inspection-requests', { params: { mine: true } })
      .then((r) => r.data),
};
