import { StyleSheet, Text, View } from 'react-native';

import { AuthColors, AuthFonts } from '@/constants/theme';

export function AuthHeader({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 18,
    paddingHorizontal: 8,
  },
  title: {
    color: AuthColors.heading,
    fontFamily: AuthFonts.display,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  subtitle: {
    color: AuthColors.body,
    fontFamily: AuthFonts.body,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
    textAlign: 'center',
  },
});
