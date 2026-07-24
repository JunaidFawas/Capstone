import { Redirect, Slot, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import '../global.css';

const queryClient = new QueryClient();

function RootNavigation() {
  const { token, role, isHydrated, hydrate } = useAuthStore();
  const segments = useSegments();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!isHydrated) return null; // splash / loading state

  const inAuthGroup = segments[0] === '(auth)';

  if (!token && !inAuthGroup) {
    return <Redirect href="/(auth)/login" />;
  }

  if (token && inAuthGroup) {
    if (role === 'student') return <Redirect href="/(student)" />;
    if (role === 'landlord') return <Redirect href="/(landlord)" />;
    if (role === 'admin') return <Redirect href="/(admin)" />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
}
