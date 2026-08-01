import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AuthButton, AuthScreen } from '@/components/auth';
import { AuthColors, AuthFonts } from '@/constants/theme';

export default function ForgotPasswordSuccessScreen() {
  const router = useRouter();

  return (
    <AuthScreen>
      <View style={styles.centerWrap}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons color={AuthColors.primary} name="check-decagram-outline" size={28} />
        </View>

        <Text style={styles.title}>Password reset successfully created.</Text>
        <Text style={styles.subtitle}>
          Congratulations! Your password has been reset successfully. Click button below to automatically login to your
          dashboard.
        </Text>

        <AuthButton onPress={() => router.replace('/(auth)/login')} title="Proceed to Dashboard" />
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  centerWrap: {
    alignItems: 'center',
    paddingTop: 36,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: 'rgba(235, 116, 73, 0.12)',
    borderRadius: 999,
    height: 56,
    justifyContent: 'center',
    marginBottom: 20,
    width: 56,
  },
  title: {
    color: AuthColors.heading,
    fontFamily: AuthFonts.display,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    textAlign: 'center',
  },
  subtitle: {
    color: AuthColors.body,
    fontFamily: AuthFonts.body,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 24,
    marginTop: 8,
    textAlign: 'center',
  },
});
