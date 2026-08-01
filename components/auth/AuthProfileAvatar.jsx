import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthColors, AuthFonts } from '@/constants/theme';

export function AuthProfileAvatar({ imageUri, onPress, label = 'Upload Profile Picture' }) {
  return (
    <View style={styles.container}>
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.avatarButton}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatarImage} />
        ) : (
          <MaterialCommunityIcons color={AuthColors.muted} name="account-outline" size={36} />
        )}
      </Pressable>

      <Pressable accessibilityRole="button" onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarButton: {
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 999,
    height: 72,
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden',
    width: 72,
  },
  avatarImage: {
    height: '100%',
    width: '100%',
  },
  label: {
    color: AuthColors.accent,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    fontWeight: '600',
  },
});
