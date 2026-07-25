import { StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';

import {
  AuthButton,
  AuthDefaultFieldIcon,
  AuthHeader,
  AuthInput,
  AuthScreen,
  AuthTrailingIcon,
} from '@/components/auth';
import { AuthColors, AuthFonts } from '@/constants/theme';

export default function LoginScreen() {
  return (
    <AuthScreen
      primaryAction={{ title: 'Sign In' }}
      footer={
        <Text style={styles.footerText}>
          New here?{' '}
          <Link href="/(auth)/register" style={styles.footerLink}>
            Create an account
          </Link>
        </Text>
      }
    >
      <AuthHeader title="Welcome Back" subtitle="Sign in to continue to CampusNest." />

      <AuthInput
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        label="Email"
        leftAccessory={<AuthDefaultFieldIcon name="mail-outline" />}
        placeholder="Enter your email"
        rightAccessory={<AuthTrailingIcon name="mail-outline" />}
      />

      <AuthInput
        autoCapitalize="none"
        autoComplete="password"
        label="Password"
        leftAccessory={<AuthDefaultFieldIcon name="lock-closed-outline" />}
        placeholder="Enter your password"
        secureTextEntry
        rightAccessory={<AuthTrailingIcon name="eye-outline" />}
      />

      <Text style={styles.forgotPassword}>Forgot password?</Text>

      <AuthButton title="Sign In" />

      <Text style={styles.footerText}>
        New here?{' '}
        <Link href="/(auth)/register" style={styles.footerLink}>
          Create an account
        </Link>
      </Text>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    color: AuthColors.accent,
    fontFamily: AuthFonts.body,
    fontSize: 13,
    marginBottom: 18,
    textAlign: 'right',
  },
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
