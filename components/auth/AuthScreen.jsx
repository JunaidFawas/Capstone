import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthColors } from '@/constants/theme';

export function AuthScreen({ children }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <View style={styles.hero}>
        <View style={styles.heroGlowTopLeft} />
        <View style={styles.heroGlowTopRight} />
        <View style={styles.heroGlowCenter} />
      </View>

      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AuthColors.background,
  },
  hero: {
    height: 164,
    backgroundColor: AuthColors.primary,
    overflow: 'hidden',
  },
  heroGlowTopLeft: {
    position: 'absolute',
    top: -72,
    left: -54,
    width: 122,
    height: 122,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 232, 220, 0.72)',
  },
  heroGlowTopRight: {
    position: 'absolute',
    top: -40,
    right: -38,
    width: 184,
    height: 184,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 232, 220, 0.16)',
  },
  heroGlowCenter: {
    position: 'absolute',
    top: 42,
    right: 30,
    width: 132,
    height: 132,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 231, 216, 0.28)',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  card: {
    flex: 1,
    marginTop: -24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: AuthColors.surface,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 28,
  },
});
