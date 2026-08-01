import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import {
  AuthButton,
  AuthHeader,
  AuthInput,
  AuthProfileAvatar,
  AuthScreen,
  AuthTrailingIcon,
} from '@/components/auth';
import { AuthColors, AuthFonts } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';

export default function CompleteProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const role = typeof params.role === 'string' ? params.role : 'student';
  const login = useAuthStore((state) => state.login);
  const [submitting, setSubmitting] = useState(false);
  const [avatarUri, setAvatarUri] = useState('');
  const [institution, setInstitution] = useState('');
  const [housingPreference, setHousingPreference] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      avatarUri.length > 0 &&
      institution.trim().length > 0 &&
      housingPreference.trim().length > 0 &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0 &&
      password === confirmPassword
    );
  }, [avatarUri, confirmPassword, housingPreference, institution, password]);

  const pickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to your photo library to upload a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets?.[0]?.uri ?? '');
    }
  };

  const finishRegistration = async () => {
    setSubmitting(true);

    try {
      await login('campusnest-demo-token', role);
      router.replace(role === 'landlord' ? '/(landlord)' : '/(student)');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthScreen
      footer={
        <Text style={styles.footerText}>
          Need to change your email?{' '}
          <Link href={{ pathname: '/(auth)/register-details', params: { role } }} style={styles.footerLink}>
            Go back
          </Link>
        </Text>
      }
    >
      <AuthHeader
        title="Complete Registration"
        subtitle="Fill the form below to complete registration."
      />

      <AuthProfileAvatar imageUri={avatarUri} onPress={pickAvatar} />

      <AuthInput
        autoCapitalize="words"
        label="Select Institution"
        placeholder="Enter your Institution"
        required
        onChangeText={setInstitution}
        rightAccessory={<AuthTrailingIcon name="chevron-down-outline" />}
        value={institution}
      />

      <AuthInput
        autoCapitalize="words"
        label="Housing Preference"
        placeholder="Select room type"
        required
        onChangeText={setHousingPreference}
        rightAccessory={<AuthTrailingIcon name="home-outline" />}
        value={housingPreference}
      />

      <AuthInput
        autoCapitalize="none"
        autoComplete="password"
        label="Password"
        placeholder="Enter your password"
        required
        onChangeText={setPassword}
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
        placeholder="Confirm password"
        required
        onChangeText={setConfirmPassword}
        rightAccessory={
          <Pressable hitSlop={10} onPress={() => setConfirmPasswordVisible((current) => !current)}>
            <AuthTrailingIcon name={confirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'} />
          </Pressable>
        }
        secureTextEntry={!confirmPasswordVisible}
        value={confirmPassword}
      />

      <AuthButton disabled={submitting || !canSubmit} onPress={finishRegistration} title="Create Profile" />
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
