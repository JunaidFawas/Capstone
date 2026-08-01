import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AuthButton, AuthHeader, AuthInput, AuthScreen, AuthTrailingIcon } from '@/components/auth';
import { AuthColors } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialEmail = typeof params.email === 'string' ? params.email : '';
  const [email, setEmail] = useState(initialEmail);

  const canSubmit = useMemo(() => email.trim().length > 0, [email]);

  const goToVerify = () => {
    router.push({
      pathname: '/(auth)/forgot-password-verify',
      params: { email: email.trim() },
    });
  };

  return (
    <AuthScreen>
      <AuthHeader title="Forgot Password" subtitle="Enter your email address below to proceed." />

      <View style={styles.iconWrap}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons color={AuthColors.primary} name="lock-outline" size={24} />
        </View>
      </View>

      <AuthInput
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        label="Email"
        leftAccessory={null}
        onChangeText={setEmail}
        placeholder="Enter your email"
        required
        rightAccessory={<AuthTrailingIcon name="mail-outline" />}
        value={email}
      />

      <AuthButton disabled={!canSubmit} onPress={goToVerify} title="Proceed" />
      <AuthButton
        onPress={() => router.back()}
        style={styles.backButton}
        surfaceStyle={styles.secondarySurface}
        textStyle={styles.secondaryText}
        title="Go Back"
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: 'rgba(235, 116, 73, 0.12)',
    borderRadius: 999,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  secondarySurface: {
    backgroundColor: '#F7E2DA',
  },
  secondaryText: {
    color: AuthColors.primary,
  },
  backButton: {
    marginTop: 12,
  },
});
