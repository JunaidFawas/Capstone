import { api } from './api';
import type { Review } from '@/types';

export const reviewsService = {
  listForListing: (listingId: string) =>
    api.get<Review[]>(`/listings/${listingId}/reviews`).then((r) => r.data),

  create: (listingId: string, payload: { rating: number; comment?: string }) =>
    api.post<Review>(`/listings/${listingId}/reviews`, payload).then((r) => r.data),

  respond: (reviewId: string, payload: { response: string }) =>
    api.post<Review>(`/reviews/${reviewId}/response`, payload).then((r) => r.data),
};
