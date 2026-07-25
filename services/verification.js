import { api } from './api';
export const verificationService = {
  submit: (landlordId, payload) =>
    api
      .post(`/landlords/${landlordId}/verification`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data),
  getStatus: (landlordId) =>
    api.get(`/landlords/${landlordId}/verification-status`).then((r) => r.data),
};
