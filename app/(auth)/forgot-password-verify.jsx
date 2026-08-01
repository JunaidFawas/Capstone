import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AuthButton, AuthHeader, AuthOtpCodeInput, AuthScreen } from '@/components/auth';
import { AuthColors, AuthFonts } from '@/constants/theme';

export default function ForgotPasswordVerifyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = typeof params.email === 'string' ? params.email : 'g******@gmail.com';
  const [code, setCode] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(7 * 60 + 45);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  const timerLabel = useMemo(() => {
    const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
    const seconds = String(remainingSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [remainingSeconds]);

  const maskedEmail = useMemo(() => {
    const [namePart, domainPart] = email.split('@');
    if (!domainPart || namePart.length <= 2) {
      return email;
    }

    return `${namePart[0]}******@${domainPart}`;
  }, [email]);

  const goToCreatePassword = () => {
    router.push({ pathname: '/(auth)/forgot-password-create', params: { email } });
  };

  const resendCode = () => {
    setRemainingSeconds(7 * 60 + 45);
  };

  return (
    <AuthScreen>
      <AuthHeader title="Verify Your Email" subtitle="Verify your email to continue." />

      <View style={styles.iconWrap}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons color={AuthColors.primary} name="email-outline" size={24} />
        </View>
      </View>

      <Text style={styles.instructions}>
        Enter the 4 digit OTP code sent to your email <Text style={styles.email}>{maskedEmail}</Text> below to
        verify your email address.
      </Text>

      <AuthOtpCodeInput length={4} onChange={setCode} value={code} />

      <View style={styles.timerRow}>
        <Text style={styles.timerLabel}>code expires in</Text>
        <Text style={styles.timerValue}>{timerLabel}</Text>
      </View>

      <Text style={styles.resendText}>
        Didn&apos;t get code?{' '}
        <Text onPress={resendCode} suppressHighlighting style={styles.resendLink}>
          Resend Code
        </Text>
      </Text>

      <AuthButton disabled={code.length !== 4} onPress={goToCreatePassword} title="Verify Email Address" />
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
  instructions: {
    color: AuthColors.body,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 24,
    textAlign: 'center',
  },
  email: {
    color: AuthColors.heading,
    fontWeight: '700',
  },
  timerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
  },
  timerLabel: {
    color: AuthColors.body,
    fontFamily: AuthFonts.body,
    fontSize: 13,
  },
  timerValue: {
    color: AuthColors.heading,
    fontFamily: AuthFonts.body,
    fontSize: 13,
    fontWeight: '600',
  },
  resendText: {
    color: AuthColors.body,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    marginTop: 18,
    textAlign: 'center',
  },
  resendLink: {
    color: AuthColors.accent,
    fontWeight: '700',
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
