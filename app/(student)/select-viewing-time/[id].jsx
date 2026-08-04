import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthButton } from '@/components/auth';
import { AuthColors, AuthFonts } from '@/constants/theme';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MORNING_SLOTS = ['9:00 AM', '10:00 AM', '11:30 AM'];
const AFTERNOON_SLOTS = ['1:00 PM', '2:30 PM', '4:00 PM'];

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateKey(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' });
}

export default function SelectViewingTimeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const incomingDate = Array.isArray(params.date) ? params.date[0] : params.date;
  const incomingTime = Array.isArray(params.time) ? params.time[0] : params.time;
  const today = useMemo(() => startOfDay(new Date()), []);
  const initialDate = useMemo(() => parseDateKey(incomingDate), [incomingDate]);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(incomingTime ?? '');
  const [visibleMonth, setVisibleMonth] = useState(
    new Date((initialDate ?? today).getFullYear(), (initialDate ?? today).getMonth(), 1),
  );

  const calendarDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const leadingEmptyDays = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return [
      ...Array.from({ length: leadingEmptyDays }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
  }, [visibleMonth]);

  const isCurrentMonth =
    visibleMonth.getFullYear() === today.getFullYear() && visibleMonth.getMonth() === today.getMonth();

  const changeMonth = (amount) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  };

  const saveSelection = () => {
    if (!selectedDate || !selectedTime) return;
    router.replace({
      pathname: '/(student)/request-viewing/[id]',
      params: {
        date: toDateKey(selectedDate),
        id,
        note: Array.isArray(params.note) ? params.note[0] : params.note,
        time: selectedTime,
        viewingType: Array.isArray(params.viewingType) ? params.viewingType[0] : params.viewingType,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageLabel}>Select Date &amp; Time</Text>
          <View style={styles.titleRow}>
            <Pressable accessibilityLabel="Go back" hitSlop={8} onPress={() => router.back()}>
              <Ionicons color="#171717" name="chevron-back" size={22} />
            </Pressable>
            <Text style={styles.title}>Select Date &amp; Time</Text>
          </View>

          <View style={styles.monthRow}>
            <Pressable disabled={isCurrentMonth} hitSlop={10} onPress={() => changeMonth(-1)}>
              <Ionicons color={isCurrentMonth ? '#D0D0D0' : '#171717'} name="chevron-back" size={20} />
            </Pressable>
            <Text style={styles.month}>
              {visibleMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </Text>
            <Pressable hitSlop={10} onPress={() => changeMonth(1)}>
              <Ionicons color="#171717" name="chevron-forward" size={20} />
            </Pressable>
          </View>

          <View style={styles.calendarGrid}>
            {WEEKDAYS.map((day) => <Text key={day} style={styles.weekday}>{day}</Text>)}
            {calendarDays.map((day, index) => {
              if (!day) return <View key={`empty-${index}`} style={styles.dayCell} />;
              const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day);
              const disabled = date < today;
              const selected = selectedDate ? toDateKey(date) === toDateKey(selectedDate) : false;
              return (
                <View key={toDateKey(date)} style={styles.dayCell}>
                  <Pressable
                    disabled={disabled}
                    onPress={() => setSelectedDate(date)}
                    style={[styles.dayButton, selected ? styles.selectedDay : null]}
                  >
                    <Text style={[styles.dayText, disabled ? styles.disabledDayText : null, selected ? styles.selectedDayText : null]}>{day}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>Available Time Slots</Text>
          <Text style={styles.periodLabel}>Morning</Text>
          <View style={styles.slotRow}>
            {MORNING_SLOTS.map((time) => <TimeSlot key={time} selected={selectedTime === time} time={time} onPress={() => setSelectedTime(time)} />)}
          </View>
          <Text style={styles.periodLabel}>Afternoon</Text>
          <View style={styles.slotRow}>
            {AFTERNOON_SLOTS.map((time) => <TimeSlot key={time} selected={selectedTime === time} time={time} onPress={() => setSelectedTime(time)} />)}
          </View>

          {selectedDate && selectedTime ? (
            <View style={styles.selectedCard}>
              <Text style={styles.selectedTitle}>Selected Slot</Text>
              <InfoRow icon="calendar-outline" text={formatDate(selectedDate)} />
              <InfoRow icon="time-outline" text={selectedTime} />
            </View>
          ) : null}

          <AuthButton disabled={!selectedDate || !selectedTime} onPress={saveSelection} style={styles.saveButton} title="Save" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function TimeSlot({ onPress, selected, time }) {
  return (
    <Pressable onPress={onPress} style={[styles.slot, selected ? styles.slotSelected : null]}>
      <View style={[styles.radio, selected ? styles.radioSelected : null]}>{selected ? <View style={styles.radioDot} /> : null}</View>
      <Text style={styles.slotText}>{time}</Text>
    </Pressable>
  );
}

function InfoRow({ icon, text }) {
  return <View style={styles.infoRow}><Ionicons color={AuthColors.primary} name={icon} size={18} /><Text style={styles.infoText}>{text}</Text></View>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#FFFFFF', flex: 1 }, safeArea: { flex: 1 }, content: { paddingBottom: 22, paddingHorizontal: 25 },
  pageLabel: { color: '#D1D1D1', fontFamily: AuthFonts.body, fontSize: 14, marginBottom: 45, marginLeft: -15 },
  titleRow: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  title: { color: '#151515', fontFamily: AuthFonts.display, fontSize: 22, fontWeight: '800' },
  monthRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 26, paddingHorizontal: 12 },
  month: { color: '#151515', fontFamily: AuthFonts.display, fontSize: 15, fontWeight: '600' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 17 },
  weekday: { color: '#161616', fontFamily: AuthFonts.display, fontSize: 13, fontWeight: '700', textAlign: 'center', width: '14.285%' },
  dayCell: { alignItems: 'center', height: 38, justifyContent: 'center', width: '14.285%' },
  dayButton: { alignItems: 'center', borderRadius: 15, height: 29, justifyContent: 'center', width: 29 }, selectedDay: { backgroundColor: AuthColors.primary },
  dayText: { color: '#181818', fontFamily: AuthFonts.body, fontSize: 13, fontWeight: '600' }, disabledDayText: { color: '#D0D0D0' }, selectedDayText: { color: '#FFFFFF' },
  sectionTitle: { color: '#272727', fontFamily: AuthFonts.display, fontSize: 12, fontWeight: '800', marginTop: 8 },
  periodLabel: { color: '#3A3A3A', fontFamily: AuthFonts.display, fontSize: 12, fontWeight: '700', marginBottom: 6, marginTop: 9 },
  slotRow: { flexDirection: 'row', gap: 7 }, slot: { alignItems: 'center', borderColor: '#C7C7C7', borderRadius: 9, borderWidth: 1, flex: 1, flexDirection: 'row', gap: 8, height: 39, justifyContent: 'center' }, slotSelected: { borderColor: AuthColors.primary },
  radio: { alignItems: 'center', borderColor: '#686868', borderRadius: 9, borderWidth: 1.5, height: 18, justifyContent: 'center', width: 18 }, radioSelected: { borderColor: AuthColors.primary }, radioDot: { backgroundColor: AuthColors.primary, borderRadius: 6, height: 12, width: 12 },
  slotText: { color: '#474747', fontFamily: AuthFonts.body, fontSize: 10, fontWeight: '600' }, selectedCard: { backgroundColor: '#FFF0E9', borderRadius: 13, marginTop: 23, padding: 14 },
  selectedTitle: { color: '#282828', fontFamily: AuthFonts.display, fontSize: 11, fontWeight: '800', marginBottom: 9 }, infoRow: { alignItems: 'center', flexDirection: 'row', gap: 10, marginTop: 6 }, infoText: { color: '#272727', flex: 1, fontFamily: AuthFonts.body, fontSize: 12, fontWeight: '600' }, saveButton: { marginTop: 17 },
});
