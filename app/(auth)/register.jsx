import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

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

function SocialIcon({ name, family = 'Ionicons', color }) {
  const size = 18;

  if (family === 'AntDesign') {
    return <AntDesign color={color ?? AuthColors.heading} name={name} size={size} />;
  }

  if (family === 'FontAwesome') {
    return <FontAwesome color={color ?? AuthColors.heading} name={name} size={size} />;
  }

  return <Ionicons color={color ?? AuthColors.heading} name={name} size={size} />;
}

export default function RegisterScreen() {
  const [accepted, setAccepted] = useState(true);

  return (
    <AuthScreen>
      <AuthHeader
        subtitle="Fill the form below to create an account."
        title="Create an Account"
      />

      <AuthInput
        autoCapitalize="words"
        autoComplete="name"
        label="Name"
        leftAccessory={<AuthDefaultFieldIcon name="person-outline" />}
        placeholder="Enter your full name"
        required
        rightAccessory={<AuthTrailingIcon name="person-outline" />}
      />

      <AuthInput
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        label="Email"
        leftAccessory={<AuthDefaultFieldIcon name="mail-outline" />}
        placeholder="Enter your email"
        required
        rightAccessory={<AuthTrailingIcon name="mail-outline" />}
      />

      <AuthInput
        autoCapitalize="none"
        autoComplete="tel"
        keyboardType="phone-pad"
        label="Phone Number"
        leftAccessory={<AuthPhonePrefix />}
        placeholder="Phone Number"
        required
      />

      <Pressable onPress={() => setAccepted((current) => !current)} style={styles.checkboxRow}>
        <View style={[styles.checkbox, accepted ? styles.checkboxChecked : null]}>
          {accepted ? <Text style={styles.checkboxTick}>✓</Text> : null}
        </View>

        <Text style={styles.checkboxText}>
          I agree to the <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </Pressable>

      <AuthButton title="Create an Account" />

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialRow}>
        <Pressable style={styles.socialButton}>
          <SocialIcon family="AntDesign" name="google" color="#EA4335" />
        </Pressable>
        <Pressable style={styles.socialButton}>
          <SocialIcon family="FontAwesome" name="apple" />
        </Pressable>
        <Pressable style={styles.socialButton}>
          <SocialIcon family="Ionicons" name="close" />
        </Pressable>
        <Pressable style={styles.socialButton}>
          <SocialIcon family="FontAwesome" name="facebook" color="#1877F2" />
        </Pressable>
      </View>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Link href="/(auth)/login" style={styles.footerLink}>
          Sign In
        </Link>
      </Text>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  checkboxRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 18,
  },
  checkbox: {
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderRadius: 4,
    borderWidth: 1,
    height: 22,
    justifyContent: 'center',
    marginRight: 10,
    width: 22,
  },
  checkboxChecked: {
    borderColor: AuthColors.accent,
  },
  checkboxTick: {
    color: AuthColors.accent,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 14,
  },
  checkboxText: {
    color: AuthColors.heading,
    flex: 1,
    fontFamily: AuthFonts.body,
    fontSize: 15,
    lineHeight: 22,
  },
  link: {
    color: AuthColors.accent,
    fontWeight: '500',
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
  },
  dividerLine: {
    backgroundColor: AuthColors.divider,
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: AuthColors.heading,
    fontFamily: AuthFonts.body,
    fontSize: 13,
  },
  socialRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 14,
  },
  socialButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    width: 34,
  },
  footerText: {
    color: AuthColors.muted,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  footerLink: {
    color: AuthColors.accent,
    fontWeight: '700',
  },
});
