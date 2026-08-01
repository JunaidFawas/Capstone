import { Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';

import {
  AuthButton,
  AuthHeader,
  AuthInput,
  AuthScreen,
  AuthTrailingIcon,
} from '@/components/auth';

export default function ForgotPasswordCreateScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = typeof params.email === 'string' ? params.email : '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const canSubmit = useMemo(
    () => password.trim().length > 0 && confirmPassword.trim().length > 0 && password === confirmPassword,
    [confirmPassword, password]
  );

  const goToSuccess = () => {
    router.push({ pathname: '/(auth)/forgot-password-success', params: { email } });
  };

  return (
    <AuthScreen>
      <AuthHeader title="Create Password" subtitle="Enter your new password below to proceed." />

      <AuthInput
        autoCapitalize="none"
        autoComplete="password"
        label="Password"
        onChangeText={setPassword}
        placeholder="Enter your password"
        required
        rightAccessory={
          <Pressable hitSlop={10} onPress={() => setPasswordVisible((current) => !current)}>
            <AuthTrailingIcon name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} />
          </Pressable>
        }
        secureTextEntry={!passwordVisible}
        value={password}
      />

      <AuthInput
        autoCapitalize="none"
        autoComplete="password"
        label="Confirm Password"
        onChangeText={setConfirmPassword}
        placeholder="confirm password"
        required
        rightAccessory={
          <Pressable hitSlop={10} onPress={() => setConfirmPasswordVisible((current) => !current)}>
            <AuthTrailingIcon name={confirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'} />
          </Pressable>
        }
        secureTextEntry={!confirmPasswordVisible}
        value={confirmPassword}
      />

      <AuthButton disabled={!canSubmit} onPress={goToSuccess} title="Reset Password" />
    </AuthScreen>
  );
}
