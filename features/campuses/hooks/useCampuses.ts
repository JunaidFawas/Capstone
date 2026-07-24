import { useQuery } from '@tanstack/react-query';
import { campusesService } from '@/services/campuses';

export const useCampuses = () =>
  useQuery({
    queryKey: ['campuses'],
    queryFn: campusesService.list,
  });
