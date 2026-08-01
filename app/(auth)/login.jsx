import { Feather, FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';

import {
  AuthButton,
  AuthDefaultFieldIcon,
  AuthHeader,
  AuthInput,
  AuthScreen,
  AuthTrailingIcon,
} from '@/components/auth';
import { AuthColors, AuthFonts } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const canSubmit = useMemo(() => email.trim().length > 0 && password.trim().length > 0, [email, password]);

  const handleSignIn = async () => {
    if (!canSubmit) return;

    await login('demo-token', 'student');
    router.replace('/(student)');
  };

  return (
    <AuthScreen
      footer={
        <Text style={styles.footerText}>
          Don&apos;t have an account?{' '}
          <Link href="/(auth)/register" style={styles.footerLink}>
            Sign Up
          </Link>
        </Text>
      }
    >
      <AuthHeader title="Sign In" subtitle="Fill the form below to sign into your account." />

      <AuthInput
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        label="Email"
        leftAccessory={<AuthDefaultFieldIcon name="mail-outline" />}
        onChangeText={setEmail}
        placeholder="Enter your email"
        rightAccessory={<AuthTrailingIcon name="mail-outline" />}
        value={email}
      />

      <AuthInput
        autoCapitalize="none"
        autoComplete="password"
        label="Password"
        leftAccessory={<AuthDefaultFieldIcon name="lock-closed-outline" />}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={!passwordVisible}
        rightAccessory={
          <Pressable hitSlop={10} onPress={() => setPasswordVisible((current) => !current)}>
            <AuthTrailingIcon name={passwordVisible ? 'eye-off-outline' : 'eye-outline'} />
          </Pressable>
        }
        value={password}
      />

      <Pressable
        hitSlop={10}
        onPress={() => router.push({ pathname: '/(auth)/forgot-password', params: { email } })}
        style={styles.forgotPasswordHitArea}
      >
        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </Pressable>

      <AuthButton disabled={!canSubmit} onPress={handleSignIn} title="Sign In" />

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialRow}>
        <SocialIconButton>
          <FontAwesome color="#DB4437" name="google" size={22} />
        </SocialIconButton>
        <SocialIconButton>
          <FontAwesome color="#000000" name="apple" size={24} />
        </SocialIconButton>
        <SocialIconButton>
          <Feather color="#000000" name="x" size={21} />
        </SocialIconButton>
        <SocialIconButton>
          <FontAwesome color="#1877F2" name="facebook" size={22} />
        </SocialIconButton>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    color: AuthColors.accent,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    textAlign: 'right',
  },
  forgotPasswordHitArea: {
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  dividerLine: {
    backgroundColor: '#1F1F1F',
    flex: 1,
    height: 1,
    opacity: 0.55,
  },
  dividerText: {
    color: AuthColors.heading,
    fontFamily: AuthFonts.body,
    fontSize: 14,
  },
  socialRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 22,
    marginTop: 12,
  },
  socialButton: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 32,
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

function SocialIconButton({ children }) {
  return <Pressable style={styles.socialButton}>{children}</Pressable>;
}
