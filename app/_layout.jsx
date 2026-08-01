import * as SplashScreen from 'expo-splash-screen';
import { Redirect, Slot, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import '../global.css';
const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 550,
  fade: true,
});

function getHomeHref(role) {
  if (role === 'landlord') return '/(landlord)';
  if (role === 'admin') return '/(admin)';
  return '/(student)';
}

function RootNavigation() {
  const { token, role, isHydrated, hydrate } = useAuthStore();
  const segments = useSegments();
  const currentGroup = segments[0];
  const protectedGroups = new Set(['(student)', '(landlord)', '(admin)']);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (isHydrated) {
      SplashScreen.hideAsync();
    }
  }, [isHydrated]);

  if (!isHydrated) return null; // splash / loading state

  if (token && (currentGroup === '(auth)' || !currentGroup)) {
    return <Redirect href={getHomeHref(role)} />;
  }

  if (!token && currentGroup && protectedGroups.has(currentGroup)) {
    return <Redirect href="/(auth)/register" />;
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
