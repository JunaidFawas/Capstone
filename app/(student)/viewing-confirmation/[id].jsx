import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthButton } from '@/components/auth';
import { getListingById } from '@/constants/properties';
import { AuthColors, AuthFonts } from '@/constants/theme';

function formatDateKey(value) {
  if (!value) return '';
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  });
}

export default function ViewingConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const listing = getListingById(id);
  const dateValue = Array.isArray(params.date) ? params.date[0] : params.date;
  const date = formatDateKey(dateValue);
  const time = Array.isArray(params.time) ? params.time[0] : params.time ?? '2:30 PM';

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageLabel}>Viewing Confirmation</Text>

          <View style={styles.successGraphic}>
            <View style={styles.successGlow}>
              <View style={styles.successCircle}>
                <Ionicons color="#FFFFFF" name="checkmark" size={38} />
              </View>
            </View>
            <View style={[styles.confetti, styles.confettiOne]} />
            <View style={[styles.confetti, styles.confettiTwo]} />
            <View style={[styles.confetti, styles.confettiThree]} />
            <View style={[styles.confetti, styles.confettiFour]} />
          </View>

          <Text style={styles.title}>Viewing Confirmed!</Text>
          <Text style={styles.subtitle}>Your appointment has been{`\n`}scheduled successfully</Text>

          <View style={styles.card}>
            <View style={styles.propertyRow}>
              <Image contentFit="cover" source={listing.image} style={styles.propertyImage} />
              <View style={styles.propertyCopy}>
                <Text style={styles.propertyName}>{listing.title}</Text>
                <View style={styles.locationRow}>
                  <Ionicons color="#8A8A8A" name="location-outline" size={11} />
                  <Text style={styles.locationText}>{listing.location.replace(/campus/i, 'Campus')}</Text>
                </View>
              </View>
            </View>

            <View style={styles.detailsList}>
              <DetailRow icon="calendar-outline" text={date} />
              <DetailRow icon="time-outline" text={time} />
              <DetailRow icon="location-outline" text="Bodija, Ibadan" />
              <DetailRow icon="person-outline" text={'Mr. Adewale;\nLandlord'} />
              <DetailRow icon="call-outline" text="+2347047657126" />
            </View>
          </View>

          <AuthButton
            onPress={() => router.push({ pathname: '/(student)/property/[id]', params: { id: listing.id } })}
            style={styles.primaryButton}
            title="View Details"
          />
          <Pressable onPress={() => router.replace('/(student)')} style={styles.homeButton}>
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function DetailRow({ icon, text }) {
  return (
    <View style={styles.detailRow}>
      <Ionicons color={AuthColors.primary} name={icon} size={17} />
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#FFFFFF', flex: 1 },
  safeArea: { flex: 1 },
  content: { paddingBottom: 20, paddingHorizontal: 20 },
  pageLabel: { color: '#D1D1D1', fontFamily: AuthFonts.body, fontSize: 14, marginBottom: 145, marginLeft: -10, textAlign: 'center' },
  successGraphic: { alignItems: 'center', alignSelf: 'center', height: 90, justifyContent: 'center', width: 180 },
  successGlow: { alignItems: 'center', backgroundColor: '#FFF1EB', borderRadius: 43, height: 86, justifyContent: 'center', width: 86 },
  successCircle: { alignItems: 'center', backgroundColor: '#FF713E', borderRadius: 27, height: 54, justifyContent: 'center', width: 54 },
  confetti: { borderRadius: 3, height: 5, position: 'absolute', width: 5 },
  confettiOne: { backgroundColor: '#A8E7BD', left: 32, top: 23 },
  confettiTwo: { backgroundColor: '#FFC258', right: 31, top: 15 },
  confettiThree: { backgroundColor: '#FF9C7D', right: 19, top: 48 },
  confettiFour: { backgroundColor: '#A8E7BD', bottom: 18, left: 46 },
  title: { color: '#151515', fontFamily: AuthFonts.display, fontSize: 22, fontWeight: '800', marginTop: 22, textAlign: 'center' },
  subtitle: { color: '#888888', fontFamily: AuthFonts.body, fontSize: 13, lineHeight: 16, marginBottom: 17, marginTop: 5, textAlign: 'center' },
  card: { borderColor: '#D4D4D4', borderRadius: 13, borderWidth: 1, padding: 9 },
  propertyRow: { alignItems: 'center', flexDirection: 'row' },
  propertyImage: { borderRadius: 8, height: 47, width: 101 },
  propertyCopy: { flex: 1, marginLeft: 12 },
  propertyName: { color: '#171717', fontFamily: AuthFonts.display, fontSize: 12, fontWeight: '800' },
  locationRow: { alignItems: 'center', flexDirection: 'row', marginTop: 3 },
  locationText: { color: '#8B8B8B', fontFamily: AuthFonts.body, fontSize: 9, marginLeft: 2 },
  detailsList: { marginTop: 12 },
  detailRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 10, marginBottom: 10 },
  detailText: { color: '#292929', fontFamily: AuthFonts.body, fontSize: 12, lineHeight: 15 },
  primaryButton: { marginTop: 17 },
  homeButton: { alignItems: 'center', borderColor: AuthColors.primary, borderRadius: 12, borderWidth: 1, height: 44, justifyContent: 'center', marginTop: 16 },
  homeButtonText: { color: '#151515', fontFamily: AuthFonts.button, fontSize: 14, fontWeight: '700' },
});
