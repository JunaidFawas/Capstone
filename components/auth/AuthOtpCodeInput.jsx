import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { AuthColors } from '@/constants/theme';

export function AuthOtpCodeInput({ value = '', onChange, length = 4 }) {
  const inputs = useRef([]);
  const digits = useMemo(() => {
    const current = value.slice(0, length).split('');
    return Array.from({ length }, (_, index) => current[index] ?? '');
  }, [length, value]);

  useEffect(() => {
    const firstEmpty = digits.findIndex((digit) => digit === '');
    const focusIndex = firstEmpty === -1 ? length - 1 : firstEmpty;
    inputs.current[focusIndex]?.focus?.();
  }, [digits, length]);

  const updateDigit = (index, nextValue) => {
    const nextDigit = nextValue.replace(/[^0-9]/g, '').slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = nextDigit;
    onChange(nextDigits.join(''));

    if (nextDigit && index < length - 1) {
      inputs.current[index + 1]?.focus?.();
    }
  };

  return (
    <View style={styles.row}>
      {digits.map((digit, index) => (
        <TextInput
          key={`otp-${index}`}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(nextValue) => updateDigit(index, nextValue)}
          placeholder=" "
          placeholderTextColor={AuthColors.muted}
          selectionColor={AuthColors.primary}
          style={styles.box}
          value={digit}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  box: {
    borderColor: '#D9D9D9',
    borderRadius: 10,
    borderWidth: 1,
    color: AuthColors.heading,
    fontSize: 20,
    fontWeight: '600',
    height: 48,
    textAlign: 'center',
    width: 48,
  },
});
