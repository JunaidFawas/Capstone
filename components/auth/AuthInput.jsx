import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AuthColors, AuthFonts } from '@/constants/theme';

export function AuthInput({
  label,
  required = false,
  leftAccessory,
  rightAccessory,
  style,
  inputStyle,
  containerStyle,
  ...textInputProps
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>

      <View style={[styles.field, focused && styles.fieldFocused, style]}>
        {leftAccessory ? <View style={styles.leftAccessory}>{leftAccessory}</View> : null}

        <TextInput
          {...textInputProps}
          onBlur={(event) => {
            setFocused(false);
            textInputProps.onBlur?.(event);
          }}
          onFocus={(event) => {
            setFocused(true);
            textInputProps.onFocus?.(event);
          }}
          placeholderTextColor={AuthColors.muted}
          style={[
            styles.input,
            leftAccessory ? styles.inputWithLeftAccessory : null,
            rightAccessory ? styles.inputWithRightAccessory : null,
            inputStyle,
          ]}
        />

        {rightAccessory ? (
          <View style={styles.rightAccessory}>{rightAccessory}</View>
        ) : null}
      </View>
    </View>
  );
}

export function AuthDefaultFieldIcon({ name }) {
  return <Ionicons color={AuthColors.borderStrong} name={name} size={18} />;
}

export function AuthPhonePrefix() {
  return (
    <View style={styles.phonePrefix}>
      <View style={styles.flag}>
        <View style={styles.flagGreen} />
        <View style={styles.flagWhite} />
        <View style={styles.flagGreen} />
      </View>
      <Text style={styles.chevron}>⌄</Text>
      <View style={styles.phoneDivider} />
    </View>
  );
}

export function AuthTrailingIcon({ name }) {
  return <Ionicons color={AuthColors.borderStrong} name={name} size={19} />;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: AuthColors.body,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    marginBottom: 8,
  },
  required: {
    color: AuthColors.accent,
  },
  field: {
    alignItems: 'center',
    backgroundColor: AuthColors.inputFill,
    borderColor: AuthColors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 45,
    paddingHorizontal: 12,
  },
  fieldFocused: {
    borderColor: AuthColors.borderStrong,
  },
  input: {
    color: AuthColors.heading,
    flex: 1,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    paddingVertical: 10,
  },
  inputWithLeftAccessory: {
    marginLeft: 8,
  },
  inputWithRightAccessory: {
    marginRight: 8,
  },
  leftAccessory: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightAccessory: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phonePrefix: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  flag: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    flexDirection: 'row',
    height: 12,
    overflow: 'hidden',
    width: 18,
  },
  flagGreen: {
    backgroundColor: '#0A7F2E',
    flex: 1,
    height: '100%',
  },
  flagWhite: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    height: '100%',
  },
  chevron: {
    color: AuthColors.body,
    fontSize: 13,
    marginTop: -1,
  },
  phoneDivider: {
    backgroundColor: AuthColors.border,
    height: 16,
    marginHorizontal: 2,
    width: 1,
  },
});
