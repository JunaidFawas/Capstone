import { StyleSheet, Text } from 'react-native';

import {
  AuthButton,
  AuthDefaultFieldIcon,
  AuthHeader,
  AuthInput,
  AuthScreen,
  AuthTrailingIcon,
} from '@/components/auth';
import { AuthColors, AuthFonts } from '@/constants/theme';

export default function OtpScreen() {
  return (
    <AuthScreen
      primaryAction={{ title: 'Verify' }}
      footer={
        <Text style={styles.footerText}>
          Didn&apos;t get a code? <Text style={styles.footerLink}>Resend</Text>
        </Text>
      }
    >
      <AuthHeader
        title="Verify Your Account"
        subtitle="Enter the code we sent to your phone number."
      />

      <AuthInput
        autoCapitalize="none"
        autoComplete="one-time-code"
        keyboardType="number-pad"
        label="Verification Code"
        leftAccessory={<AuthDefaultFieldIcon name="key-outline" />}
        placeholder="Enter code"
        rightAccessory={<AuthTrailingIcon name="checkmark-circle-outline" />}
      />

      <AuthButton title="Verify" />

      <Text style={styles.footerText}>
        Didn&apos;t get a code? <Text style={styles.footerLink}>Resend</Text>
      </Text>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  footerText: {
    color: AuthColors.muted,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    marginTop: 18,
    textAlign: 'center',
  },
  footerLink: {
    color: AuthColors.accent,
    fontWeight: '700',
  },
});
