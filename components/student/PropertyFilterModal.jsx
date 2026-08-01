import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AuthButton } from '@/components/auth';
import {
  AMENITY_OPTIONS,
  DEFAULT_PROPERTY_FILTERS,
  DISTANCE_OPTIONS,
  PRICE_OPTIONS,
  ROOM_TYPE_OPTIONS,
} from '@/constants/properties';
import { AuthColors, AuthFonts } from '@/constants/theme';

const TRACK_PADDING = 16;

function formatPrice(value) {
  if (value >= 1000000) return `${Math.round(value / 1000000)}M`;
  return `N${Math.round(value / 1000)}k`;
}

function cloneFilters(filters) {
  return {
    priceRange: [...(filters?.priceRange ?? DEFAULT_PROPERTY_FILTERS.priceRange)],
    distance: filters?.distance ?? DEFAULT_PROPERTY_FILTERS.distance,
    roomTypes: [...(filters?.roomTypes ?? DEFAULT_PROPERTY_FILTERS.roomTypes)],
    amenities: [...(filters?.amenities ?? DEFAULT_PROPERTY_FILTERS.amenities)],
  };
}

export function PropertyFilterModal({ visible, filters, onApply, onReset, onClose }) {
  const [draft, setDraft] = useState(() => cloneFilters(filters));
  const [trackWidth, setTrackWidth] = useState(1);
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(48)).current;

  useEffect(() => {
    if (visible) {
      setDraft(cloneFilters(filters));
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [backdropOpacity, filters, sheetTranslateY, visible]);

  const priceStartIndex = useMemo(() => Math.max(0, PRICE_OPTIONS.indexOf(draft.priceRange[0])), [draft.priceRange]);
  const priceEndIndex = useMemo(() => Math.max(0, PRICE_OPTIONS.indexOf(draft.priceRange[1])), [draft.priceRange]);

  const updatePriceIndex = (nextStartIndex, nextEndIndex) => {
    const start = Math.max(0, Math.min(nextStartIndex, PRICE_OPTIONS.length - 2));
    const end = Math.max(start + 1, Math.min(nextEndIndex, PRICE_OPTIONS.length - 1));
    setDraft((current) => ({
      ...current,
      priceRange: [PRICE_OPTIONS[start], PRICE_OPTIONS[end]],
    }));
  };

  const snapToPriceIndex = useCallback((x) => {
    const usableWidth = Math.max(trackWidth - TRACK_PADDING * 2, 1);
    const ratio = Math.max(0, Math.min(1, (x - TRACK_PADDING) / usableWidth));
    return Math.round(ratio * (PRICE_OPTIONS.length - 1));
  }, [trackWidth]);

  const leftResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          const nextIndex = snapToPriceIndex(gestureState.moveX);
          updatePriceIndex(nextIndex, priceEndIndex);
        },
      }),
    [priceEndIndex, snapToPriceIndex]
  );

  const rightResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          const nextIndex = snapToPriceIndex(gestureState.moveX);
          updatePriceIndex(priceStartIndex, nextIndex);
        },
      }),
    [priceStartIndex, snapToPriceIndex]
  );

  const activeLeft = ((priceStartIndex / (PRICE_OPTIONS.length - 1)) * Math.max(trackWidth - TRACK_PADDING * 2, 1)) + TRACK_PADDING;
  const activeRight = ((priceEndIndex / (PRICE_OPTIONS.length - 1)) * Math.max(trackWidth - TRACK_PADDING * 2, 1)) + TRACK_PADDING;

  const toggleDraftItem = (key, value) => {
    setDraft((current) => {
      const selected = current[key];
      const exists = selected.includes(value);
      return {
        ...current,
        [key]: exists ? selected.filter((item) => item !== value) : [...selected, value],
      };
    });
  };

  const applyFilters = () => {
    onApply(cloneFilters(draft));
    onClose();
  };

  const resetFilters = () => {
    onReset?.();
    setDraft(cloneFilters(DEFAULT_PROPERTY_FILTERS));
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal animationType="none" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable onPress={onClose} style={styles.backdrop} />

        <Animated.View
          style={[
            styles.sheet,
            {
              opacity: backdropOpacity,
              transform: [{ translateY: sheetTranslateY }],
            },
          ]}
        >
          <View style={styles.headerRow}>
            <Text style={styles.title}>Filter</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons color="#111111" name="close" size={16} />
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price</Text>
            <View
              onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
              style={styles.sliderTrackWrap}
            >
              <View style={styles.sliderTrack} />
              <View
                style={[
                  styles.sliderActive,
                  {
                    left: activeLeft,
                    width: Math.max(activeRight - activeLeft, 10),
                  },
                ]}
              />

              <View
                {...leftResponder.panHandlers}
                style={[styles.sliderHandle, { left: activeLeft - 10 }]}
              />
              <View
                {...rightResponder.panHandlers}
                style={[styles.sliderHandle, { left: activeRight - 10 }]}
              />
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>{formatPrice(draft.priceRange[0])}</Text>
              <Text style={styles.priceLabelCenter}>{formatPrice(draft.priceRange[1])}</Text>
              <Text style={styles.priceLabelRight}>{formatPrice(PRICE_OPTIONS[PRICE_OPTIONS.length - 1])}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Distance from Campus</Text>
            <View style={styles.chipGrid}>
              {DISTANCE_OPTIONS.map((option) => (
                <FilterChip
                  key={option.id}
                  label={option.label}
                  selected={draft.distance === option.id}
                  onPress={() => setDraft((current) => ({ ...current, distance: option.id }))}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Room Type</Text>
            <View style={styles.chipGrid}>
              {ROOM_TYPE_OPTIONS.map((option) => (
                <FilterChip
                  key={option.id}
                  label={option.label}
                  selected={draft.roomTypes.includes(option.id)}
                  onPress={() => toggleDraftItem('roomTypes', option.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {AMENITY_OPTIONS.map((option) => (
                <AmenityChip
                  key={option.id}
                  label={option.label}
                  selected={draft.amenities.includes(option.id)}
                  onPress={() => toggleDraftItem('amenities', option.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.actions}>
            <AuthButton onPress={applyFilters} title="Apply Filter" />
            <Pressable onPress={resetFilters} style={styles.resetButton}>
              <Text style={styles.resetText}>Reset Filter</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

function FilterChip({ label, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.pill, selected && styles.pillSelected]}>
      <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{label}</Text>
    </Pressable>
  );
}

function AmenityChip({ label, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.amenityChip}>
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected ? <Ionicons color="#FFFFFF" name="checkmark" size={10} /> : null}
      </View>
      <Text style={styles.amenityText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 15, 15, 0.42)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
    maxHeight: Dimensions.get('window').height * 0.9,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    color: '#111111',
    fontFamily: AuthFonts.display,
    fontSize: 18,
    fontWeight: '800',
  },
  closeButton: {
    alignItems: 'center',
    borderColor: '#111111',
    borderRadius: 6,
    borderWidth: 1,
    height: 22,
    justifyContent: 'center',
    width: 22,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    color: '#111111',
    fontFamily: AuthFonts.body,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  sliderTrackWrap: {
    height: 28,
    justifyContent: 'center',
  },
  sliderTrack: {
    backgroundColor: '#C9C6C2',
    borderRadius: 999,
    height: 2,
    marginHorizontal: TRACK_PADDING,
  },
  sliderActive: {
    backgroundColor: AuthColors.primary,
    borderRadius: 999,
    height: 2,
    position: 'absolute',
    top: 13,
  },
  sliderHandle: {
    backgroundColor: '#FFFFFF',
    borderColor: AuthColors.primary,
    borderRadius: 999,
    borderWidth: 1.5,
    height: 20,
    position: 'absolute',
    top: 3,
    width: 20,
  },
  priceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  priceLabel: {
    color: '#111111',
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '700',
  },
  priceLabelCenter: {
    color: '#111111',
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '700',
  },
  priceLabelRight: {
    color: '#7D7D7D',
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '600',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pill: {
    borderColor: '#D8D3CD',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillSelected: {
    borderColor: AuthColors.primary,
    backgroundColor: '#FFF5EE',
  },
  pillText: {
    color: '#2A2A2A',
    fontFamily: AuthFonts.body,
    fontSize: 12,
  },
  pillTextSelected: {
    color: AuthColors.primary,
    fontWeight: '700',
  },
  amenityChip: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  checkbox: {
    alignItems: 'center',
    borderColor: '#D8D3CD',
    borderRadius: 4,
    borderWidth: 1,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  checkboxSelected: {
    backgroundColor: AuthColors.primary,
    borderColor: AuthColors.primary,
  },
  amenityText: {
    color: '#2A2A2A',
    fontFamily: AuthFonts.body,
    fontSize: 12,
  },
  actions: {
    gap: 12,
    marginTop: 18,
  },
  resetButton: {
    alignItems: 'center',
    backgroundColor: '#FFF1EA',
    borderRadius: 12,
    minHeight: 48,
    justifyContent: 'center',
  },
  resetText: {
    color: AuthColors.primary,
    fontFamily: AuthFonts.body,
    fontSize: 15,
    fontWeight: '700',
  },
});
