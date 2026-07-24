import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function AdminLayout() {
  const role = useAuthStore((s) => s.role);
  if (role !== 'admin') return <Redirect href="/(auth)/login" />;
  return <Stack />;
}
