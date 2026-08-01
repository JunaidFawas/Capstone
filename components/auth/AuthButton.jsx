import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthColors, AuthFonts } from '@/constants/theme';

export function AuthButton({
  title,
  onPress,
  disabled = false,
  style,
  surfaceStyle,
  textStyle,
  accessibilityLabel,
}) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? title}
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, style]}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.surface,
            surfaceStyle,
            pressed && !disabled ? styles.surfacePressed : null,
            disabled ? styles.surfaceDisabled : null,
          ]}
        >
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    borderRadius: 12,
    width: '100%',
  },
  surface: {
    alignItems: 'center',
    backgroundColor: AuthColors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 24,
    paddingVertical: 0,
  },
  surfacePressed: {
    backgroundColor: AuthColors.primaryPressed,
  },
  surfaceDisabled: {
    opacity: 0.6,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: AuthFonts.button,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});
