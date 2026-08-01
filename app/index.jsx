import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, FlatList, StatusBar, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { AuthButton } from '@/components/auth';
import { AuthFonts, Fonts } from '@/constants/theme';

const SPLASH_DURATION = 1500;

const onboardingSlides = [
  {
    id: 'discover',
    title: 'Find Perfect Student Home',
    subtitle: 'Discover verified hostels and apartments close to your campus, all in one place.',
    image: require('../assets/images/Onboarding screen 1.png'),
    imageFit: 'cover',
  },
  {
    id: 'trust',
    title: 'Verified and Trusted Listings',
    subtitle: 'Browse verified properties, trusted landlords, and genuine student reviews before you move in.',
    image: require('../assets/images/Onboarding screen 2.png'),
    imageFit: 'contain',
  },
  {
    id: 'apply',
    title: 'Apply in Minutes and Move In With Ease',
    subtitle: 'Browse verified properties, trusted landlords, and genuine student reviews before you move in.',
    image: require('../assets/images/Onboarding screen 3.png'),
    imageFit: 'contain',
  },
];

export default function StartScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const listRef = useRef(null);

  const [showSplash, setShowSplash] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const splashOpacity = useRef(new Animated.Value(1)).current;
  const splashScale = useRef(new Animated.Value(0.92)).current;
  const bounce = useRef(new Animated.Value(0)).current;
  const onboardingOpacity = useRef(new Animated.Value(0)).current;

  const heroHeight = useMemo(() => {
    return Math.min(Math.max(height * 0.58, 390), 560);
  }, [height]);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: 1,
          duration: 1300,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 1300,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.parallel([
      Animated.spring(splashScale, {
        toValue: 1,
        friction: 7,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.timing(splashOpacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
    pulse.start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 320,
          useNativeDriver: true,
        }),
        Animated.timing(onboardingOpacity, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setShowSplash(false);
        }
      });
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(timer);
      pulse.stop();
    };
  }, [bounce, onboardingOpacity, splashOpacity, splashScale]);

  const handleAdvance = () => {
    if (activeIndex < onboardingSlides.length - 1) {
      listRef.current?.scrollToIndex({
        animated: true,
        index: activeIndex + 1,
      });
      return;
    }

    router.replace('/(auth)/register');
  };

  const renderSlide = ({ item }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <View style={[styles.hero, { height: heroHeight, paddingTop: insets.top + 8 }]}>
          <Image source={item.image} contentFit={item.imageFit} style={styles.heroImage} transition={220} />
          <View style={styles.heroFade} />
        </View>

        <View style={styles.copyArea}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>

          <View style={styles.dotRow}>
            {onboardingSlides.map((slide, index) => {
              const isActive = slide.id === item.id;
              return <View key={slide.id} style={[styles.dot, isActive && styles.dotActive]} />;
            })}
          </View>

          <AuthButton
            onPress={handleAdvance}
            style={styles.cta}
            surfaceStyle={styles.ctaSurface}
            textStyle={styles.ctaText}
            title="Get Started"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      {showSplash ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.splashLayer,
            {
              opacity: splashOpacity,
            },
          ]}
        >
          <View style={styles.splashBackdrop}>
            <Animated.View
              style={[
                styles.splashOrb,
                styles.splashOrbTopLeft,
                {
                  transform: [
                    {
                      translateY: bounce.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -10],
                      }),
                    },
                    {
                      scale: bounce.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.06],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.splashOrb,
                styles.splashOrbBottomRight,
                {
                  transform: [
                    {
                      translateY: bounce.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 10],
                      }),
                    },
                  ],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.splashBrandWrap,
                {
                  opacity: splashOpacity,
                  transform: [
                    { scale: splashScale },
                    {
                      translateY: bounce.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -6],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Image source={require('../assets/images/applogo.png')} contentFit="contain" style={styles.splashBrand} />
              <Text style={styles.splashTagline}>Student housing you can trust</Text>
            </Animated.View>
          </View>
        </Animated.View>
      ) : null}

      <Animated.View style={[styles.onboardingLayer, { opacity: onboardingOpacity }]}>
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
          <FlatList
            ref={listRef}
            data={onboardingSlides}
            horizontal
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            renderItem={renderSlide}
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            onMomentumScrollEnd={(event) => {
              const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              setActiveIndex(nextIndex);
            }}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            initialScrollIndex={0}
            style={styles.carousel}
          />
        </SafeAreaView>

        <View pointerEvents="none" style={styles.overlaySheet}>
          <View style={styles.overlayTopFade} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFDF9',
  },
  splashLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
  splashBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  splashOrb: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(235, 116, 73, 0.08)',
  },
  splashOrbTopLeft: {
    height: 180,
    left: -44,
    top: 110,
    width: 180,
  },
  splashOrbBottomRight: {
    height: 240,
    right: -72,
    bottom: 84,
    width: 240,
    backgroundColor: 'rgba(30, 30, 30, 0.05)',
  },
  splashBrandWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  splashBrand: {
    height: 118,
    width: 260,
  },
  splashTagline: {
    color: '#4B4B4B',
    fontFamily: AuthFonts.body,
    fontSize: 13,
    marginTop: 8,
    letterSpacing: 0.2,
  },
  onboardingLayer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  carousel: {
    flex: 1,
  },
  slide: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
  },
  copyArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 18,
    justifyContent: 'flex-start',
  },
  title: {
    color: '#151515',
    fontFamily: Fonts.serif,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.6,
    lineHeight: 31,
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#5F5F5F',
    fontFamily: AuthFonts.body,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
    maxWidth: 330,
  },
  dotRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: 24,
  },
  dot: {
    backgroundColor: '#D9D9D9',
    borderRadius: 999,
    height: 6,
    width: 6,
  },
  dotActive: {
    backgroundColor: '#EB7449',
    width: 20,
  },
  cta: {
    marginTop: 14,
    width: '100%',
  },
  ctaText: {
    color: '#FFFFFF',
    fontFamily: AuthFonts.button,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  ctaSurface: {
    borderRadius: 14,
    minHeight: 52,
    shadowColor: '#D9653E',
    shadowOffset: {
      height: 8,
      width: 0,
    },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 3,
  },
  overlaySheet: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTopFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 20,
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
  },
});
