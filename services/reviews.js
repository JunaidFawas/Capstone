import { api } from './api';
export const reviewsService = {
  listForListing: (listingId) => api.get(`/listings/${listingId}/reviews`).then((r) => r.data),
  create: (listingId, payload) =>
    api.post(`/listings/${listingId}/reviews`, payload).then((r) => r.data),
  respond: (reviewId, payload) =>
    api.post(`/reviews/${reviewId}/response`, payload).then((r) => r.data),
};
