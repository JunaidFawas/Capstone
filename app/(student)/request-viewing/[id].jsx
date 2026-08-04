import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthButton } from '@/components/auth';
import { getListingById } from '@/constants/properties';
import { AuthColors, AuthFonts } from '@/constants/theme';

function formatDateKey(value) {
  if (!value) return 'Select Date';
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    weekday: 'short',
    year: 'numeric',
  });
}

export default function RequestViewingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;
  const listing = getListingById(Array.isArray(id) ? id[0] : id);
  const selectedDate = Array.isArray(params.date) ? params.date[0] : params.date;
  const selectedTime = Array.isArray(params.time) ? params.time[0] : params.time;
  const [viewingType, setViewingType] = useState(
    (Array.isArray(params.viewingType) ? params.viewingType[0] : params.viewingType) ?? 'physical',
  );
  const [note, setNote] = useState((Array.isArray(params.note) ? params.note[0] : params.note) ?? '');
  const openDateAndTime = () =>
    router.push({
      pathname: '/(student)/select-viewing-time/[id]',
      params: {
        date: selectedDate,
        id: listing.id,
        note,
        time: selectedTime,
        viewingType,
      },
    });

  const continueToConfirmation = () => {
    router.push({
      pathname: '/(student)/viewing-confirmation/[id]',
      params: { date: selectedDate, id: listing.id, time: selectedTime },
    });
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.safeArea}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.pageLabel}>Request viewing</Text>
            <Pressable accessibilityLabel="Go back" hitSlop={8} onPress={() => router.back()} style={styles.backButton}>
              <Ionicons color="#727272" name="chevron-back" size={19} />
            </Pressable>

            <Text style={styles.title}>Schedule Viewing</Text>
            <Text style={styles.subtitle}>Schedule a visit to inspect the property</Text>

            <View style={styles.propertyCard}>
              <Image contentFit="cover" source={listing.image} style={styles.propertyImage} />
              <View style={styles.propertyInfoRow}>
                <View style={styles.propertyCopy}>
                  <Text style={styles.propertyName}>{listing.title}</Text>
                  <View style={styles.inlineMeta}>
                    <Ionicons color="#8C8C8C" name="location-outline" size={11} />
                    <Text style={styles.metaText}>{listing.location.replace(/campus/i, 'Campus')}</Text>
                  </View>
                </View>
                <View style={styles.propertyPriceCopy}>
                  <Text style={styles.price}>{listing.price}</Text>
                  <View style={styles.inlineMeta}>
                    <Ionicons color="#F5B900" name="star" size={11} />
                    <Text style={styles.metaText}>{listing.rating.toFixed(1)}</Text>
                  </View>
                </View>
              </View>
              <Pressable
                onPress={() => router.push({ pathname: '/(student)/property/[id]', params: { id: listing.id } })}
                style={styles.detailsButton}
              >
                <Text style={styles.detailsText}>View Details</Text>
              </Pressable>
            </View>

            <Text style={styles.fieldLabel}>Viewing Type</Text>
            <View style={styles.typeRow}>
              <ViewingTypeButton
                active={viewingType === 'physical'}
                icon="accessibility-outline"
                label="Physical Viewing"
                onPress={() => setViewingType('physical')}
              />
              <ViewingTypeButton
                active={viewingType === 'virtual'}
                icon="videocam-outline"
                label="Virtual Tour"
                onPress={() => setViewingType('virtual')}
              />
            </View>

            <Text style={styles.fieldLabel}>Preferred Date</Text>
            <PickerField icon="calendar-outline" label={formatDateKey(selectedDate)} onPress={openDateAndTime} />

            <Text style={styles.fieldLabel}>Preferred Time</Text>
            <PickerField icon="time-outline" label={selectedTime || 'Select Time'} onPress={openDateAndTime} />

            <Text style={styles.fieldLabel}>
              Additional Note <Text style={styles.optional}>(Optional)</Text>
            </Text>
            <TextInput
              multiline
              onChangeText={setNote}
              placeholder="E.g I’d like to inspect the parking space and kitchen."
              placeholderTextColor="#989898"
              style={styles.noteInput}
              textAlignVertical="top"
              value={note}
            />

            <AuthButton
              disabled={!selectedDate || !selectedTime}
              onPress={continueToConfirmation}
              style={styles.continueButton}
              title="Continue"
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

function ViewingTypeButton({ active, icon, label, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.typeButton, active && styles.typeButtonActive]}>
      <Ionicons color="#111111" name={icon} size={21} />
      <Text style={styles.typeText}>{label}</Text>
    </Pressable>
  );
}

function PickerField({ icon, label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.pickerField}>
      <Ionicons color="#777777" name={icon} size={21} />
      <Text style={styles.pickerText}>{label}</Text>
      <Ionicons color="#777777" name="chevron-forward" size={19} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#FFFFFF', flex: 1 },
  safeArea: { flex: 1 },
  content: { paddingBottom: 18, paddingHorizontal: 20 },
  pageLabel: {
    color: '#D1D1D1',
    fontFamily: AuthFonts.body,
    fontSize: 14,
    marginBottom: 25,
    marginLeft: -15,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 18,
    height: 28,
    justifyContent: 'center',
    marginBottom: 10,
    width: 28,
  },
  title: { color: '#151515', fontFamily: AuthFonts.display, fontSize: 22, fontWeight: '800' },
  subtitle: { color: '#8A8A8A', fontFamily: AuthFonts.body, fontSize: 11, marginBottom: 10, marginTop: 2 },
  propertyCard: {
    borderColor: '#DEDEDE',
    borderRadius: 11,
    borderWidth: 1,
    overflow: 'hidden',
  },
  propertyImage: { height: 109, width: '100%' },
  propertyInfoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 6, paddingTop: 7 },
  propertyCopy: { flex: 1 },
  propertyPriceCopy: { alignItems: 'flex-end' },
  propertyName: { color: '#191919', fontFamily: AuthFonts.display, fontSize: 11, fontWeight: '800' },
  price: { color: AuthColors.primary, fontFamily: AuthFonts.display, fontSize: 11, fontWeight: '800' },
  inlineMeta: { alignItems: 'center', flexDirection: 'row' },
  metaText: { color: '#888888', fontFamily: AuthFonts.body, fontSize: 9, marginLeft: 2 },
  detailsButton: { alignItems: 'center', paddingBottom: 8, paddingTop: 6 },
  detailsText: { color: AuthColors.primary, fontFamily: AuthFonts.body, fontSize: 11, fontWeight: '700' },
  fieldLabel: { color: '#565656', fontFamily: AuthFonts.display, fontSize: 13, fontWeight: '700', marginBottom: 7, marginTop: 8 },
  typeRow: { flexDirection: 'row', gap: 15 },
  typeButton: {
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    height: 43,
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
  },
  typeButtonActive: { borderColor: AuthColors.primary },
  typeText: { color: '#222222', fontFamily: AuthFonts.body, fontSize: 11 },
  pickerField: {
    alignItems: 'center',
    borderColor: '#D2D2D2',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    height: 43,
    paddingHorizontal: 11,
  },
  pickerText: { color: '#999999', flex: 1, fontFamily: AuthFonts.body, fontSize: 11, marginLeft: 11 },
  optional: { fontFamily: AuthFonts.body, fontWeight: '400' },
  noteInput: {
    borderColor: '#D2D2D2',
    borderRadius: 10,
    borderWidth: 1,
    color: '#333333',
    fontFamily: AuthFonts.body,
    fontSize: 11,
    height: 43,
    lineHeight: 15,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  continueButton: { marginTop: 18 },
});
