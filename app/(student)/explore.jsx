import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { PropertyFilterModal } from '@/components/student/PropertyFilterModal';
import { AuthColors, AuthFonts } from '@/constants/theme';
import { filterListings, LISTING_TYPES, PROPERTY_LISTINGS } from '@/constants/properties';
import { useSearchFilterStore } from '@/store/searchFilterStore';

export default function StudentExploreScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [selectedListingType, setSelectedListingType] = useState(LISTING_TYPES[0].id);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filters = useSearchFilterStore((state) => state);
  const setFilters = useSearchFilterStore((state) => state.setFilters);
  const resetFilters = useSearchFilterStore((state) => state.reset);

  const cardWidth = useMemo(() => (width - 16 * 2 - 12) / 2, [width]);

  const filteredListings = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const modeListings = filterListings(PROPERTY_LISTINGS, filters).filter((item) => {
      const matchesType = selectedListingType === 'apartment' ? item.listingType === 'apartment' : item.listingType === 'rooms';
      const matchesQuery =
        normalized.length === 0 ||
        item.title.toLowerCase().includes(normalized) ||
        item.location.toLowerCase().includes(normalized) ||
        item.type.toLowerCase().includes(normalized);

      return matchesType && matchesQuery;
    });
    return modeListings;
  }, [filters, query, selectedListingType]);

  const suggestionList = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (normalized.length === 0) {
      return filterListings(PROPERTY_LISTINGS, filters).slice(0, 5);
    }

    return filterListings(PROPERTY_LISTINGS, filters).filter((item) => {
      return (
        item.title.toLowerCase().includes(normalized) ||
        item.location.toLowerCase().includes(normalized) ||
        item.type.toLowerCase().includes(normalized)
      );
    }).slice(0, 5);
  }, [filters, query]);

  const openListing = (id) => {
    router.push({ pathname: '/(student)/property/[id]', params: { id } });
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Search Hostel</Text>

          <View style={styles.searchField}>
            <Ionicons color="#8E8E8E" name="search-outline" size={18} />
            <TextInput
              placeholder="Search Listings"
              placeholderTextColor="#A5A5A5"
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
            />
            {query.length > 0 ? (
              <Pressable onPress={() => setQuery('')} hitSlop={8} style={styles.clearButton}>
                <Ionicons color="#222222" name="close" size={14} />
              </Pressable>
            ) : null}
            <Pressable onPress={() => setFiltersOpen(true)} hitSlop={8} style={styles.searchFilterButton}>
              <Ionicons color="#7B7B7B" name="options-outline" size={18} />
            </Pressable>
          </View>

          {query.trim().length > 0 ? (
            <View style={styles.resultsCard}>
              {suggestionList.map((item, index) => (
                <Pressable
                  key={`${item.id}-${index}`}
                  onPress={() => openListing(item.id)}
                  style={[styles.resultRow, index === suggestionList.length - 1 ? styles.resultRowLast : null]}
                >
                  <Image contentFit="cover" source={item.image} style={styles.resultThumb} />
                  <View style={styles.resultTextBlock}>
                    <Text style={styles.resultTitle}>{item.title}</Text>
                    <View style={styles.resultMetaRow}>
                      <Ionicons color="#F7B500" name="star" size={11} />
                      <Text style={styles.resultMetaText}>{item.rating.toFixed(1)}</Text>
                      <Text style={styles.resultMetaText}>|</Text>
                      <Text style={styles.resultMetaText}>Student hostel</Text>
                    </View>
                  </View>
                  <Ionicons color="#8F8F8F" name="chevron-forward" size={18} />
                </Pressable>
              ))}
            </View>
          ) : null}

          <View style={styles.filterRow}>
            {LISTING_TYPES.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setSelectedListingType(item.id)}
                style={[styles.filterChip, selectedListingType === item.id && styles.filterChipSelected]}
              >
                <Text style={[styles.filterText, selectedListingType === item.id && styles.filterTextSelected]}>
                  {item.label}
                </Text>
                {item.id === 'apartment' ? <Ionicons color="#585858" name="chevron-down" size={14} /> : null}
              </Pressable>
            ))}
            <Pressable onPress={() => setFiltersOpen(true)} style={styles.filterPill}>
              <Text style={styles.filterText}>Filter</Text>
              <Ionicons color="#585858" name="chevron-down" size={14} />
            </Pressable>
          </View>

          <SectionHeader title="Recommended Hostels" />

          <View style={styles.grid}>
            {filteredListings.map((item) => (
              <RecommendedCard key={item.id} item={item} width={cardWidth} onPress={() => openListing(item.id)} />
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

function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionAction}>See all</Text>
    </View>
  );
}

function RecommendedCard({ item, width, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, { width }]}>
      <Image contentFit="cover" source={item.image} style={styles.cardImage} />
      <View style={styles.cardOverlay} />
      <View style={styles.cardHeart}>
        <Ionicons color="#FFFFFF" name="heart" size={14} />
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardTextBlock}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardPrice}>{item.price}</Text>
          <View style={styles.cardMetaRow}>
            <Ionicons color="#F7B500" name="star" size={11} />
            <Text style={styles.cardMetaText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.cardAction}>View details</Text>
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  title: {
    color: '#161616',
    fontFamily: AuthFonts.display,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
  },
  searchField: {
    alignItems: 'center',
    borderColor: '#D5D1CC',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  searchInput: {
    color: '#171717',
    flex: 1,
    fontFamily: AuthFonts.body,
    fontSize: 13,
    paddingVertical: 0,
  },
  clearButton: {
    alignItems: 'center',
    borderColor: '#202020',
    borderRadius: 8,
    borderWidth: 1,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  searchFilterButton: {
    alignItems: 'center',
    backgroundColor: '#F6F4F1',
    borderRadius: 10,
    height: 26,
    justifyContent: 'center',
    width: 26,
  },
  resultsCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E7E1DA',
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
    overflow: 'hidden',
  },
  resultRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomColor: '#F0ECE8',
    borderBottomWidth: 1,
  },
  resultRowLast: {
    borderBottomWidth: 0,
  },
  resultThumb: {
    borderRadius: 8,
    height: 40,
    width: 40,
  },
  resultTextBlock: {
    flex: 1,
  },
  resultTitle: {
    color: '#191919',
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '700',
  },
  resultMetaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginTop: 2,
  },
  resultMetaText: {
    color: '#A3A3A3',
    fontFamily: AuthFonts.body,
    fontSize: 10,
  },
  filterRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  filterChip: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E4DDD6',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    height: 40,
    paddingHorizontal: 14,
  },
  filterChipSelected: {
    borderColor: AuthColors.primary,
  },
  filterPill: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E4DDD6',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    height: 40,
    paddingHorizontal: 14,
  },
  filterText: {
    color: '#2D2D2D',
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextSelected: {
    color: '#1B1B1B',
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 18,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    borderRadius: 14,
    height: 150,
    overflow: 'hidden',
  },
  cardImage: {
    height: '100%',
    width: '100%',
  },
  cardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: '52%',
  },
  cardHeart: {
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
    alignItems: 'flex-end',
    bottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 8,
    position: 'absolute',
    right: 8,
  },
  cardTextBlock: {
    flex: 1,
    paddingRight: 6,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '800',
  },
  cardPrice: {
    color: AuthColors.primary,
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  cardMetaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
    marginTop: 2,
  },
  cardMetaText: {
    color: '#FFFFFF',
    fontFamily: AuthFonts.body,
    fontSize: 10,
  },
  cardAction: {
    color: AuthColors.primary,
    fontFamily: AuthFonts.body,
    fontSize: 10,
    fontWeight: '700',
    paddingBottom: 1,
  },
});
