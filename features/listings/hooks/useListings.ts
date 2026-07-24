import { useQuery } from '@tanstack/react-query';
import { listingsService } from '@/services/listings';
import type { ListingFilters } from '@/types';

export const useListings = (filters: ListingFilters) =>
  useQuery({
    queryKey: ['listings', filters],
    queryFn: () => listingsService.search(filters),
  });
