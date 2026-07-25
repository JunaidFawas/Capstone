import { useQuery } from '@tanstack/react-query';
import { listingsService } from '@/services/listings';
export const useListings = (filters) =>
  useQuery({
    queryKey: ['listings', filters],
    queryFn: () => listingsService.search(filters),
  });
