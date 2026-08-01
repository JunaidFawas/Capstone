import { Image, StyleSheet, Text, View } from 'react-native';

import { AuthButton } from './AuthButton';
import { AuthColors, AuthFonts } from '@/constants/theme';

export function AuthChoiceCard({
  title,
  description,
  buttonLabel,
  imageSource,
  imageStyle,
  accent = AuthColors.primary,
  onPress,
  style,
}) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.row}>
        {imageSource ? (
          <Image resizeMode="contain" source={imageSource} style={[styles.image, imageStyle]} />
        ) : null}

        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <AuthButton
        onPress={onPress}
        surfaceStyle={{ backgroundColor: accent }}
        style={styles.button}
        title={buttonLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 18,
  },
  image: {
    height: 92,
    width: 92,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: AuthColors.heading,
    fontFamily: AuthFonts.display,
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    color: AuthColors.body,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    lineHeight: 19,
  },
  button: {
    borderRadius: 12,
  },
});
