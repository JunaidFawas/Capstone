import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Share, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthButton } from '@/components/auth';
import { AuthColors, AuthFonts } from '@/constants/theme';
import { getListingById, PROPERTY_IMAGES } from '@/constants/properties';

const TABS = ['About', 'Gallery', 'Review'];
const HOUSE_RULES = [
  'No smoking indoors',
  'Visitors allowed during approved hours',
  'Keep shared spaces clean',
  'Quiet hours from 10:00 PM',
];

export default function PropertyDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const listing = getListingById(Array.isArray(id) ? id[0] : id);
  const propertyGallery = useMemo(
    () => [listing.image, ...PROPERTY_IMAGES.filter((image) => image !== listing.image)],
    [listing.image],
  );
  const [activeTab, setActiveTab] = useState('About');
  const [selectedImage, setSelectedImage] = useState(0);

  const distance = listing.location.replace(/from campus/i, 'from Campus');

  const shareListing = async () => {
    await Share.share({ message: `${listing.title} — ${listing.price}` });
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <Text style={styles.pageTitle}>Product details</Text>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Image
              cachePolicy="memory-disk"
              contentFit="cover"
              recyclingKey={`hero-${selectedImage}`}
              source={propertyGallery[selectedImage]}
              style={styles.heroImage}
            />

            <View style={styles.heroTopRow}>
              <RoundButton icon="chevron-back" label="Go back" onPress={() => router.back()} />
              <View style={styles.heroActions}>
                <RoundButton icon="share-social" label="Share property" onPress={shareListing} />
                <RoundButton icon="heart-outline" label="Save property" onPress={() => {}} />
              </View>
            </View>

            <View style={styles.thumbnailTray}>
              {propertyGallery.map((image, index) => (
                <Pressable
                  accessibilityLabel={`View property image ${index + 1}`}
                  key={index}
                  onPress={() => setSelectedImage(index)}
                  style={styles.thumbnailWrap}
                >
                  <Image
                    cachePolicy="memory-disk"
                    contentFit="cover"
                    recyclingKey={`property-thumbnail-${index}`}
                    source={image}
                    style={styles.thumbnail}
                  />
                  {selectedImage === index ? <View pointerEvents="none" style={styles.thumbnailSelected} /> : null}
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>Student Hostel</Text>
            </View>

            <View style={styles.headingRow}>
              <View style={styles.headingCopy}>
                <Text style={styles.propertyTitle}>{listing.title}</Text>
                <View style={styles.metaRow}>
                  <Ionicons color="#F5B900" name="star" size={12} />
                  <Text style={styles.metaText}>{listing.rating.toFixed(1)}</Text>
                  <Ionicons color="#8D8D8D" name="location-outline" size={12} style={styles.locationIcon} />
                  <Text style={styles.metaText}>{distance}</Text>
                </View>
              </View>
              <Text style={styles.price}>{listing.price}</Text>
            </View>

            <View style={styles.tabs}>
              {TABS.map((tab) => (
                <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
                  <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
                  {activeTab === tab ? <View style={styles.tabIndicator} /> : null}
                </Pressable>
              ))}
            </View>

            {activeTab === 'About' ? <AboutContent description={listing.description} /> : null}
            {activeTab === 'Gallery' ? <GalleryContent images={propertyGallery} onSelect={setSelectedImage} /> : null}
            {activeTab === 'Review' ? <ReviewContent rating={listing.rating} /> : null}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <AuthButton
            onPress={() =>
              router.push({ pathname: '/(student)/request-viewing/[id]', params: { id: listing.id } })
            }
            title="Schedule viewing"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

function RoundButton({ icon, label, onPress }) {
  return (
    <Pressable accessibilityLabel={label} hitSlop={8} onPress={onPress} style={styles.roundButton}>
      <Ionicons color="#111111" name={icon} size={21} />
    </Pressable>
  );
}

function AboutContent({ description }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={[styles.sectionTitle, styles.rulesTitle]}>House Rules</Text>
      {HOUSE_RULES.map((rule, index) => (
        <Text key={rule} style={styles.ruleText}>{`${index + 1}. ${rule}`}</Text>
      ))}
    </View>
  );
}

function GalleryContent({ images, onSelect }) {
  return (
    <View style={styles.galleryGrid}>
      {images.map((image, index) => (
        <Pressable key={index} onPress={() => onSelect(index)} style={styles.galleryItem}>
          <Image
            cachePolicy="memory-disk"
            contentFit="cover"
            recyclingKey={`gallery-image-${index}`}
            source={image}
            style={styles.galleryImage}
          />
        </Pressable>
      ))}
    </View>
  );
}

function ReviewContent({ rating }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Guest reviews</Text>
      <View style={styles.reviewRow}>
        <Ionicons color="#F5B900" name="star" size={18} />
        <Text style={styles.reviewScore}>{rating.toFixed(1)}</Text>
        <Text style={styles.description}> Highly rated by students</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { flex: 1 },
  pageTitle: {
    color: '#D3D3D3',
    fontFamily: AuthFonts.display,
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 8,
    paddingHorizontal: 6,
  },
  content: { paddingBottom: 16 },
  hero: { height: 212, marginHorizontal: 6, position: 'relative' },
  heroImage: { height: '100%', width: '100%' },
  heroTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center',
    left: 14,
    position: 'absolute',
    right: 14,
    top: 13,
  },
  heroActions: { flexDirection: 'row', gap: 10 },
  roundButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(228, 222, 199, 0.92)',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  thumbnailTray: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 24,
    padding: 5,
    position: 'absolute',
    right: 24,
  },
  thumbnailWrap: { borderRadius: 7, height: 35, overflow: 'hidden', width: 45 },
  thumbnailSelected: {
    borderColor: AuthColors.primary,
    borderRadius: 7,
    borderWidth: 1.5,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  thumbnail: { height: 35, width: 45 },
  body: { paddingHorizontal: 20, paddingTop: 11 },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6F2EE',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  categoryText: { color: '#24735E', fontFamily: AuthFonts.body, fontSize: 9 },
  headingRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 12, justifyContent: 'space-between', marginTop: 15 },
  headingCopy: { flex: 1 },
  propertyTitle: { color: '#161616', fontFamily: AuthFonts.display, fontSize: 16, fontWeight: '700' },
  price: { color: AuthColors.primary, fontFamily: AuthFonts.display, fontSize: 18, fontWeight: '800' },
  metaRow: { alignItems: 'center', flexDirection: 'row', marginTop: 5 },
  metaText: { color: '#858585', fontFamily: AuthFonts.body, fontSize: 9, marginLeft: 2 },
  locationIcon: { marginLeft: 8 },
  tabs: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 17 },
  tabButton: { alignItems: 'center', minWidth: 76, paddingTop: 2 },
  tabText: { color: '#777777', fontFamily: AuthFonts.body, fontSize: 14 },
  tabTextActive: { color: AuthColors.primary },
  tabIndicator: { backgroundColor: AuthColors.primary, height: 1, marginTop: 7, width: 56 },
  sectionTitle: { color: '#171717', fontFamily: AuthFonts.display, fontSize: 15, fontWeight: '700', marginBottom: 7, marginTop: 16 },
  description: { color: '#737373', fontFamily: AuthFonts.body, fontSize: 13, lineHeight: 18 },
  rulesTitle: { marginTop: 15 },
  ruleText: { color: '#737373', fontFamily: AuthFonts.body, fontSize: 13, lineHeight: 19, paddingLeft: 5 },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingTop: 16 },
  galleryItem: { borderRadius: 8, height: 92, overflow: 'hidden', width: '48.5%' },
  galleryImage: { height: '100%', width: '100%' },
  reviewRow: { alignItems: 'center', flexDirection: 'row' },
  reviewScore: { color: '#222222', fontFamily: AuthFonts.display, fontSize: 16, fontWeight: '700', marginLeft: 5 },
  footer: { backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 10 },
});
