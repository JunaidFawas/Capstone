import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthButton } from '@/components/auth';
import { AuthColors, AuthFonts } from '@/constants/theme';
import { getListingById, PROPERTY_IMAGE } from '@/constants/properties';

export default function PropertyDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const listing = getListingById(Array.isArray(id) ? id[0] : id);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Image contentFit="cover" source={PROPERTY_IMAGE} style={styles.heroImage} />
            <View style={styles.heroTopRow}>
              <BackButton onPress={() => router.back()} />
              <View style={styles.heroActionRow}>
                <IconCircle name="share-outline" />
                <IconCircle name="heart-outline" />
              </View>
            </View>

            <View style={styles.heroBadge}>
              <Ionicons color="#69B66B" name="checkmark-circle" size={14} />
              <Text style={styles.heroBadgeText}>Verified property</Text>
            </View>
          </View>

          <View style={styles.sheet}>
            <View style={styles.titleRow}>
              <View style={styles.titleCopy}>
                <Text style={styles.title}>{listing.title}</Text>
                <Text style={styles.location}>{listing.location}</Text>
              </View>
              <View style={styles.pricePill}>
                <Text style={styles.price}>{listing.price}</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <StatChip label={listing.distance} icon="navigate-outline" />
              <StatChip label={listing.beds} icon="bed-outline" />
              <StatChip label={listing.baths} icon="water-outline" />
              <StatChip label={`${listing.rating.toFixed(1)} rating`} icon="star" />
            </View>

            <Text style={styles.sectionTitle}>About this place</Text>
            <Text style={styles.description}>{listing.description}</Text>

            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesRow}>
              {listing.features.map((feature) => (
                <View key={feature} style={styles.amenityChip}>
                  <Text style={styles.amenityText}>{feature}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Quick Facts</Text>
            <View style={styles.factList}>
              <FactRow label="Property type" value={listing.type.replace('-', ' ')} />
              <FactRow label="Security" value="24/7 monitored" />
              <FactRow label="Availability" value="Ready for viewing" />
            </View>

            <View style={styles.actionWrap}>
              <AuthButton onPress={() => {}} title="Apply Now" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function BackButton({ onPress }) {
  return (
    <View style={styles.backButton}>
      <Ionicons color="#171717" name="chevron-back" size={22} onPress={onPress} />
    </View>
  );
}

function IconCircle({ name }) {
  return (
    <View style={styles.iconCircle}>
      <Ionicons color="#171717" name={name} size={18} />
    </View>
  );
}

function StatChip({ label, icon }) {
  return (
    <View style={styles.statChip}>
      <Ionicons color={AuthColors.primary} name={icon} size={14} />
      <Text style={styles.statText}>{label}</Text>
    </View>
  );
}

function FactRow({ label, value }) {
  return (
    <View style={styles.factRow}>
      <Text style={styles.factLabel}>{label}</Text>
      <Text style={styles.factValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F6F2EC',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  hero: {
    height: 320,
    position: 'relative',
  },
  heroImage: {
    height: '100%',
    width: '100%',
  },
  heroTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 16,
    position: 'absolute',
    right: 16,
    top: 10,
  },
  heroActionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    elevation: 2,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  heroBadge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    bottom: 16,
    flexDirection: 'row',
    gap: 4,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    position: 'absolute',
  },
  heroBadgeText: {
    color: '#69B66B',
    fontFamily: AuthFonts.body,
    fontSize: 11,
    fontWeight: '700',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleCopy: {
    flex: 1,
  },
  title: {
    color: '#141414',
    fontFamily: AuthFonts.display,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  location: {
    color: '#888888',
    fontFamily: AuthFonts.body,
    fontSize: 13,
    marginTop: 4,
  },
  pricePill: {
    backgroundColor: '#FFF5EE',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  price: {
    color: AuthColors.primary,
    fontFamily: AuthFonts.body,
    fontSize: 14,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  statChip: {
    alignItems: 'center',
    backgroundColor: '#F7F3EE',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statText: {
    color: '#4A4A4A',
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#171717',
    fontFamily: AuthFonts.display,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 18,
    marginBottom: 8,
  },
  description: {
    color: '#5B5B5B',
    fontFamily: AuthFonts.body,
    fontSize: 14,
    lineHeight: 21,
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    backgroundColor: '#FFF4EA',
    borderColor: '#F0D7C8',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  amenityText: {
    color: AuthColors.primary,
    fontFamily: AuthFonts.body,
    fontSize: 12,
    fontWeight: '700',
  },
  factList: {
    backgroundColor: '#F8F5F1',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  factRow: {
    borderBottomColor: '#EBE4DC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  factLabel: {
    color: '#666666',
    fontFamily: AuthFonts.body,
    fontSize: 13,
  },
  factValue: {
    color: '#191919',
    fontFamily: AuthFonts.body,
    fontSize: 13,
    fontWeight: '700',
  },
  actionWrap: {
    marginTop: 18,
  },
});
