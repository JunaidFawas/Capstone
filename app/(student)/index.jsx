import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PropertyFilterModal } from '@/components/student/PropertyFilterModal';
import { AuthColors, AuthFonts } from '@/constants/theme';
import { filterListings, PROPERTY_IMAGE, PROPERTY_LISTINGS, PROPERTY_TYPES } from '@/constants/properties';
import { useSearchFilterStore } from '@/store/searchFilterStore';

const HOME_FEATURED_IDS = ['greenview-lodge', 'campus-comfort'];

export default function StudentHomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedType, setSelectedType] = useState(PROPERTY_TYPES[0].id);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filters = useSearchFilterStore((state) => state);
  const setFilters = useSearchFilterStore((state) => state.setFilters);
  const resetFilters = useSearchFilterStore((state) => state.reset);

  const featuredCardWidth = useMemo(() => (width - 16 * 2 - 12) / 2, [width]);
  const filteredListings = useMemo(() => {
    const listings = PROPERTY_LISTINGS.filter((item) => item.type === selectedType);
    return filterListings(listings.length > 0 ? listings : PROPERTY_LISTINGS, filters);
  }, [filters, selectedType]);

  const featuredListings = useMemo(() => {
    const listings = HOME_FEATURED_IDS.map((id) => PROPERTY_LISTINGS.find((item) => item.id === id)).filter(Boolean);
    const typedFeatured = listings.filter((item) => item.type === selectedType);
    return filterListings(typedFeatured.length > 0 ? typedFeatured : listings, filters).slice(0, 2);
  }, [filters, selectedType]);

  const recommendedListings = useMemo(() => {
    const baseListings = filteredListings.length >= 4 ? filteredListings : filterListings(PROPERTY_LISTINGS, filters);
    return baseListings.filter((item) => item.id !== 'greenview-lodge' && item.id !== 'campus-comfort');
  }, [filteredListings, filters]);

  const openListing = (id) => {
    router.push({ pathname: '/(student)/property/[id]', params: { id } });
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View style={styles.greetingBlock}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>T</Text>
              </View>

              <View style={styles.greetingCopy}>
                <Text style={styles.greetingTitle}>Hello Treasure 👋</Text>
                <View style={styles.locationRow}>
                  <Text style={styles.locationText}>University of Abuja, Nigeria</Text>
                  <Ionicons color="#9A9A9A" name="chevron-down" size={14} />
                </View>
              </View>
            </View>

            <View style={styles.actionsRow}>
              <ActionIcon name="chatbubble-ellipses-outline" />
              <ActionIcon name="notifications-outline" />
            </View>
          </View>

          <SearchPreview
            onFilterPress={() => setFiltersOpen(true)}
            onPress={() => router.push('/(student)/explore')}
          />

          <SectionHeader title="Featured Property" onPress={() => router.push('/(student)/explore')} />

          <View style={styles.featuredGrid}>
            {featuredListings.map((item) => (
              <PropertyCard
                key={item.id}
                item={item}
                width={featuredCardWidth}
                onPress={() => openListing(item.id)}
              />
            ))}
          </View>

          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Explore by Property</Text>
            <Text style={styles.sectionHint}>Sub type</Text>
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={styles.chipRow}
            showsHorizontalScrollIndicator={false}
          >
            {PROPERTY_TYPES.map((item) => (
              <PropertyChip
                key={item.id}
                item={item}
                selected={item.id === selectedType}
                onPress={() => setSelectedType(item.id)}
              />
            ))}
          </ScrollView>

          <SectionHeader title="Recommended for you" onPress={() => router.push('/(student)/explore')} />

          <View style={styles.recommendedGrid}>
            {recommendedListings.map((item) => (
              <PropertyCard
                key={item.id}
                item={item}
                width={(width - 16 * 2 - 12) / 2}
                onPress={() => openListing(item.id)}
                variant="dark"
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <PropertyFilterModal
        filters={filters}
        visible={filtersOpen}
        onApply={setFilters}
        onClose={() => setFiltersOpen(false)}
        onReset={resetFilters}
      />
    </View>
  );
}

function ActionIcon({ name }) {
  return (
    <Pressable style={styles.actionButton}>
      <Ionicons color="#1F1F1F" name={name} size={22} />
    </Pressable>
  );
}

function SectionHeader({ title, onPress }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable onPress={onPress} hitSlop={10}>
        <Text style={styles.sectionAction}>See all</Text>
      </Pressable>
    </View>
  );
}

function SearchPreview({ onPress, onFilterPress }) {
  return (
    <View style={styles.searchShell}>
      <Pressable onPress={onPress} style={styles.searchPressArea}>
        <Ionicons color="#9A9A9A" name="search-outline" size={20} />
        <Text style={styles.searchPlaceholder}>Search Listings</Text>
      </Pressable>
      <Pressable hitSlop={10} onPress={onFilterPress} style={styles.searchFilters}>
        <Ionicons color="#7E7E7E" name="options-outline" size={18} />
      </Pressable>
    </View>
  );
}

function PropertyChip({ item, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.propertyChip, selected && styles.propertyChipSelected]}>
      <View style={styles.propertyThumbWrap}>
        <Image contentFit="cover" source={PROPERTY_IMAGE} style={styles.propertyThumb} />
      </View>
      <Text style={[styles.propertyChipLabel, selected && styles.propertyChipLabelSelected]}>{item.label}</Text>
    </Pressable>
  );
}

function PropertyCard({ item, width, onPress, variant = 'light' }) {
  return (
    <Pressable onPress={onPress} style={[styles.featuredCard, { width }]}>
      <View style={styles.featuredImageWrap}>
        <Image contentFit="cover" source={PROPERTY_IMAGE} style={styles.featuredImage} />
        <View style={styles.verifiedBadge}>
          <Ionicons color="#69B66B" name="checkmark-circle" size={12} />
          <Text style={styles.verifiedText}>Verified</Text>
        </View>
        <View style={styles.heartButton}>
          <Ionicons color="#FFFFFF" name="heart" size={14} />
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardPrice}>{item.price}</Text>
        </View>

        <View style={styles.cardMetaRow}>
          <View style={styles.locationMeta}>
            <Ionicons color="#A1A1A1" name="location-outline" size={12} />
            <Text style={styles.cardMetaText}>{item.location}</Text>
          </View>

          <View style={styles.ratingMeta}>
            <Ionicons color="#F7B500" name="star" size={12} />
            <Text style={styles.cardMetaText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Pressable onPress={onPress} hitSlop={8} style={styles.viewDetailsButton}>
          <Text style={[styles.viewDetailsText, variant === 'dark' && styles.viewDetailsTextDark]}>View Details</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 24,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  greetingBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: 10,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#F4D1C3',
    borderRadius: 18,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  avatarText: {
    color: '#4A281C',
    fontFamily: AuthFonts.display,
    fontSize: 13,
    fontWeight: '800',
  },
  greetingCopy: {
    flexShrink: 1,
  },
  greetingTitle: {
    color: '#161616',
    fontFamily: AuthFonts.display,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    marginTop: 1,
  },
  locationText: {
    color: '#8E8E8E',
    fontFamily: AuthFonts.body,
    fontSize: 12,
  },
  actionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    alignItems: 'center',
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  searchShell: {
    alignItems: 'center',
    borderColor: '#D5D1CC',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  searchPressArea: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  searchPlaceholder: {
    color: '#A0A0A0',
    flex: 1,
    fontFamily: AuthFonts.body,
    fontSize: 13,
  },
  searchFilters: {
    alignItems: 'center',
    backgroundColor: '#F6F4F1',
    borderRadius: 10,
    height: 26,
    justifyContent: 'center',
    width: 26,
  },
  sectionTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#171717',
    fontFamily: AuthFonts.display,
    fontSize: 15,
    fontWeight: '800',
  },
  sectionAction: {
    color: AuthColors.primary,
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '600',
  },
  featuredGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8E4DF',
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  featuredImageWrap: {
    height: 118,
  },
  featuredImage: {
    height: '100%',
    width: '100%',
  },
  verifiedBadge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 3,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    top: 8,
  },
  verifiedText: {
    color: '#69B66B',
    fontFamily: AuthFonts.body,
    fontSize: 10,
    fontWeight: '700',
  },
  heartButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
    borderRadius: 999,
    height: 22,
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 8,
    width: 22,
  },
  cardBody: {
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 10,
  },
  cardTitleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardTitle: {
    color: '#1A1A1A',
    flex: 1,
    fontFamily: AuthFonts.body,
    fontSize: 13,
    fontWeight: '800',
  },
  cardPrice: {
    color: AuthColors.primary,
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '800',
  },
  cardMetaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  locationMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
  },
  ratingMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
  },
  cardMetaText: {
    color: '#8F8F8F',
    fontFamily: AuthFonts.body,
    fontSize: 10,
  },
  viewDetailsButton: {
    alignSelf: 'center',
    marginTop: 8,
  },
  viewDetailsText: {
    color: AuthColors.primary,
    fontFamily: AuthFonts.body,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  viewDetailsTextDark: {
    color: AuthColors.primary,
  },
  chipRow: {
    paddingTop: 2,
    paddingBottom: 4,
    gap: 10,
  },
  propertyChip: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E4DDD6',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    height: 42,
    paddingLeft: 5,
    paddingRight: 14,
  },
  propertyChipSelected: {
    borderColor: AuthColors.primary,
  },
  propertyThumbWrap: {
    borderRadius: 16,
    height: 30,
    overflow: 'hidden',
    width: 30,
  },
  propertyThumb: {
    height: '100%',
    width: '100%',
  },
  propertyChipLabel: {
    color: '#2A2A2A',
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '600',
  },
  propertyChipLabelSelected: {
    color: '#1B1B1B',
  },
  recommendedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sectionHint: {
    color: '#A6A6A6',
    fontFamily: AuthFonts.body,
    fontSize: 11,
  },
});
