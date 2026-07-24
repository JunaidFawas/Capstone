import { api } from './api';
import type { ScamReport } from '@/types';

export const reportsService = {
  create: (payload: {
    targetType: 'listing' | 'landlord';
    targetId: string;
    reasonCategory: string;
    note: string;
  }) => api.post<ScamReport>('/reports', payload).then((r) => r.data),
};
