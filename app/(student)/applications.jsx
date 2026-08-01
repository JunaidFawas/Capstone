import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthFonts } from '@/constants/theme';

export default function ApplicationsScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.centered}>
          <Text style={styles.title}>Applications</Text>
          <Text style={styles.subtitle}>Submitted applications will appear here.</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#171717',
    fontFamily: AuthFonts.display,
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    color: '#8C8C8C',
    fontFamily: AuthFonts.body,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
