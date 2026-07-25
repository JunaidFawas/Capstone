import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
export default function StudentLayout() {
  const role = useAuthStore((s) => s.role);
  if (role !== 'student') return <Redirect href="/(auth)/login" />;
  return <Stack />;
}
