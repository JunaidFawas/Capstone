import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthColors } from '@/constants/theme';
import { AuthKeyboardContext } from './AuthKeyboardContext';
import { useCallback, useRef } from 'react';

export function AuthScreen({ children, footer }) {
  const scrollViewRef = useRef(null);
  const contentRef = useRef(null);

  const scrollToField = useCallback((fieldRef) => {
    const scrollView = scrollViewRef.current;
    const contentView = contentRef.current;
    const fieldView = fieldRef?.current;

    if (!scrollView || !contentView || !fieldView) {
      return;
    }

    fieldView.measureLayout(
      contentView,
      (x, y) => {
        scrollView.scrollTo({
          animated: true,
          y: Math.max(y - 18, 0),
        });
      },
      () => {}
    );
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <View style={styles.hero}>
        <View style={[styles.heroBubble, styles.heroBubbleTopLeft]} />
        <View style={[styles.heroBubble, styles.heroBubbleTopRight]} />
        <View style={[styles.heroBubble, styles.heroBubbleLowerLeft]} />
        <View style={[styles.heroBubble, styles.heroBubbleLowerRight]} />
      </View>

      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
          style={styles.keyboardAvoiding}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            automaticallyAdjustKeyboardInsets
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <AuthKeyboardContext.Provider value={{ scrollToField }}>
              <View ref={contentRef} collapsable={false} style={styles.card}>
                <View style={styles.content}>{children}</View>
                {footer ? <View style={styles.footer}>{footer}</View> : null}
              </View>
            </AuthKeyboardContext.Provider>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AuthColors.surface,
  },
  hero: {
    position: 'relative',
    height: 138,
    backgroundColor: AuthColors.primary,
    overflow: 'hidden',
  },
  heroBubble: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255, 214, 191, 0.36)',
  },
  heroBubbleTopLeft: {
    height: 120,
    left: -52,
    top: -56,
    width: 120,
  },
  heroBubbleTopRight: {
    height: 132,
    right: -34,
    top: -28,
    width: 132,
  },
  heroBubbleLowerLeft: {
    height: 118,
    left: 156,
    top: 60,
    width: 118,
  },
  heroBubbleLowerRight: {
    height: 96,
    right: 18,
    top: 48,
    width: 96,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  card: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: AuthColors.surface,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    marginTop: -18,
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingTop: 20,
  },
});
