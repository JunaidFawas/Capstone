import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';

import {
  AuthButton,
  AuthDefaultFieldIcon,
  AuthHeader,
  AuthInput,
  AuthPhonePrefix,
  AuthScreen,
  AuthTrailingIcon,
} from '@/components/auth';
import { AuthColors, AuthFonts } from '@/constants/theme';

export default function RegisterDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const role = typeof params.role === 'string' ? params.role : 'student';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

  const canSubmit = useMemo(
    () =>
      termsAccepted &&
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      phone.trim().length > 0,
    [email, name, phone, termsAccepted]
  );

  const goToOtp = () => {
    router.push({
      pathname: '/(auth)/otp',
      params: {
        role,
        countryCode: selectedCountry.dialCode,
        phoneNumber: phone.trim(),
      },
    });
  };

  return (
    <AuthScreen
      footer={
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Link href="/(auth)/login" style={styles.footerLink}>
            Sign In
          </Link>
        </Text>
      }
    >
      <AuthHeader
        title="Create an Account"
        subtitle="Fill the form below to create an account."
      />

      <AuthInput
        autoCapitalize="words"
        autoComplete="name"
        label="Name"
        leftAccessory={<AuthDefaultFieldIcon name="person-outline" />}
        onChangeText={setName}
        placeholder="Enter your full name"
        required
        rightAccessory={<AuthTrailingIcon name="person-outline" />}
        value={name}
      />

      <AuthInput
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        label="Email"
        leftAccessory={<AuthDefaultFieldIcon name="mail-outline" />}
        onChangeText={setEmail}
        placeholder="Enter your email"
        required
        rightAccessory={<AuthTrailingIcon name="mail-outline" />}
        value={email}
      />

      <AuthInput
        autoCapitalize="none"
        autoComplete="tel"
        keyboardType="phone-pad"
        label="Phone Number"
        leftAccessory={<AuthPhonePrefix onPress={() => setCountryPickerOpen(true)} />}
        onChangeText={setPhone}
        placeholder="Phone Number"
        required
        value={phone}
      />

      <Pressable
        accessibilityRole="checkbox"
        onPress={() => setTermsAccepted((current) => !current)}
        style={styles.termsRow}
      >
        <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
          {termsAccepted ? <Ionicons color="#FFFFFF" name="checkmark" size={14} /> : null}
        </View>

        <Text style={styles.termsText}>
          I agree to the{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </Pressable>

      <AuthButton disabled={!canSubmit} onPress={goToOtp} title="Create an Account" />

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

      <Modal
        animationType="fade"
        onRequestClose={() => setCountryPickerOpen(false)}
        transparent
        visible={countryPickerOpen}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setCountryPickerOpen(false)}>
          <Pressable style={styles.modalSheet} onPress={(event) => event.stopPropagation()}>
            <Text style={styles.modalTitle}>Select Country</Text>

            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => {
                const selected = item.code === selectedCountry.code;
                return (
                  <Pressable
                    onPress={() => {
                      setSelectedCountry(item);
                      setCountryPickerOpen(false);
                    }}
                    style={[styles.countryRow, selected && styles.countryRowSelected]}
                  >
                    <Text style={styles.countryFlag}>{item.flag}</Text>
                    <Text style={styles.countryName}>{item.name}</Text>
                    <Text style={styles.countryDial}>{item.dialCode}</Text>
                  </Pressable>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </AuthScreen>
  );
}

const COUNTRIES = [
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255', flag: '🇹🇿' },
  { code: 'UG', name: 'Uganda', dialCode: '+256', flag: '🇺🇬' },
];

const styles = StyleSheet.create({
  termsRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 18,
  },
  checkbox: {
    alignItems: 'center',
    borderColor: '#D0D0D0',
    borderRadius: 4,
    borderWidth: 1,
    height: 22,
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
    width: 22,
  },
  checkboxChecked: {
    backgroundColor: AuthColors.primary,
    borderColor: AuthColors.primary,
  },
  termsText: {
    color: AuthColors.heading,
    flex: 1,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    lineHeight: 21,
  },
  termsLink: {
    color: AuthColors.primary,
    fontWeight: '700',
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
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
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: AuthColors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    width: '100%',
  },
  modalTitle: {
    color: AuthColors.heading,
    fontFamily: AuthFonts.display,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
  },
  countryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 14,
  },
  countryRowSelected: {
    backgroundColor: '#FFF4EA',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  countryFlag: {
    fontSize: 18,
    marginRight: 12,
  },
  countryName: {
    color: AuthColors.heading,
    flex: 1,
    fontFamily: AuthFonts.body,
    fontSize: 15,
  },
  countryDial: {
    color: AuthColors.body,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    fontWeight: '600',
  },
});

function SocialIconButton({ children }) {
  return <Pressable style={styles.socialButton}>{children}</Pressable>;
}
