import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AuthChoiceCard, AuthHeader, AuthScreen } from '@/components/auth';
import { AuthColors, AuthFonts } from '@/constants/theme';

export default function RegisterScreen() {
  const router = useRouter();

  const goToDetails = (role) => {
    router.push(`/(auth)/register-details?role=${role}`);
  };

  return (
    <AuthScreen
      footer={
        <Text style={styles.note}>
          You can always change this later in your account
          {'\n'}
          settings
        </Text>
      }
    >
      <AuthHeader
        title="Who are you?"
        subtitle="Choose the option that best describes you to continue."
      />

      <View style={styles.cards}>
        <View style={styles.firstSection}>
          <AuthChoiceCard
            accent={AuthColors.primary}
            buttonLabel="Continue as a Student"
            description="Create your Student account and find your accommodation near campus"
            imageSource={require('../../assets/images/auth/student.png')}
            imageStyle={styles.studentImage}
            onPress={() => goToDetails('student')}
            title="I'm a Student"
          />
        </View>

        <View style={styles.secondSection}>
          <AuthChoiceCard
            accent={AuthColors.primary}
            buttonLabel="Continue as a Landlord"
            description="Create your landlord account, list and manage student accommodation."
            imageSource={require('../../assets/images/auth/landlord.png')}
            imageStyle={styles.landlordImage}
            onPress={() => goToDetails('landlord')}
            title="I'm a Landlord"
          />
        </View>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  firstSection: {
    marginBottom: 36,
  },
  secondSection: {
    marginBottom: 20,
  },
  studentImage: {
    height: 88,
    width: 88,
  },
  landlordImage: {
    height: 100,
    width: 100,
  },
  note: {
    color: AuthColors.muted,
    fontFamily: AuthFonts.body,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
    textAlign: 'center',
  },
});
