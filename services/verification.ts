import { api } from './api';
import type { VerificationStatus } from '@/types';

export const verificationService = {
  submit: (landlordId: string, payload: FormData) =>
    api
      .post(`/landlords/${landlordId}/verification`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data),

  getStatus: (landlordId: string) =>
    api.get<VerificationStatus>(`/landlords/${landlordId}/verification-status`).then((r) => r.data),
};
