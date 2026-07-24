import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function LandlordLayout() {
  const role = useAuthStore((s) => s.role);
  if (role !== 'landlord') return <Redirect href="/(auth)/login" />;
  return <Stack />;
}
