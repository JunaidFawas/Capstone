import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

import { HapticTab } from '@/components/haptic-tab';
import { AuthColors, AuthFonts } from '@/constants/theme';

function TabIcon({ name, color, size }) {
  return <Ionicons color={color} name={name} size={size} />;
}

export default function StudentLayout() {
  const role = useAuthStore((s) => s.role);

  if (role !== 'student') return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AuthColors.primary,
        tabBarInactiveTintColor: '#8D8D8D',
        tabBarButton: HapticTab,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontFamily: AuthFonts.body,
          fontSize: 12,
          marginTop: 2,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E9E4DE',
          borderTopWidth: 1,
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} color={color} size={size ?? 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'search' : 'search-outline'} color={color} size={size ?? 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'heart' : 'heart-outline'} color={color} size={size ?? 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="applications"
        options={{
          title: 'Applications',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'apps' : 'apps-outline'} color={color} size={size ?? 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} color={color} size={size ?? 24} />
          ),
        }}
      />
    </Tabs>
  );
}
