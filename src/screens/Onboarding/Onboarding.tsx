import {StyleSheet, View, Pressable, ScrollView} from 'react-native';
import React, {useCallback} from 'react';
import {ONBOARDING_BACKGROUND, PAGES} from './Constants';
import Page, {PAGE_WIDTH} from './Page';
import Text from '../../components/Text/Text';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Dot from './Dot';
import {IOnboardingScreenProps} from './interfaces';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/colors';
import {saveItem} from '../../utils/storage';
import {useHeaderHeight} from '@react-navigation/elements';

const Onboarding: IOnboardingScreenProps = ({navigation}) => {
  const translateX = useSharedValue(0);
  const scrollRef = useAnimatedRef<ScrollView>();
  const headerHeight = useHeaderHeight();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const onNextPress = useCallback(async () => {
    if (activeIndex.value === PAGES.length - 1) {
      await saveItem('onboarding', JSON.stringify('true'));
      return navigation.navigate('Landing');
    }
    scrollRef.current?.scrollTo({x: PAGE_WIDTH * (activeIndex.value + 1)});
  }, [activeIndex.value, navigation, scrollRef]);

  const onSkipPress = useCallback(async () => {
    await saveItem('onboarding', JSON.stringify('true'));
    return navigation.navigate('Landing');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.skipContainer, {top: headerHeight / 1.5}]}
        onPress={onSkipPress}>
        <Text weight="bold" style={styles.skip}>
          Skip
        </Text>
      </Pressable>
      <Animated.ScrollView
        ref={scrollRef as any}
        style={styles.scrollViewContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {PAGES.map((page, index) => {
          return (
            <Page
              key={index.toString()}
              page={page}
              translateX={translateX}
              index={index}
            />
          );
        })}
      </Animated.ScrollView>
      <View style={styles.footer}>
        <View style={[styles.fillCenter, {flexDirection: 'row'}]}>
          {PAGES.map((_, index) => {
            return (
              <Dot
                key={index.toString()}
                activeDotIndex={activeIndex}
                index={index}
              />
            );
          })}
        </View>

        {/* <View style={styles.fillCenter}>
          <Text style={styles.text}>Wings</Text>
        </View> */}

        <View style={styles.fillCenter}>
          <Pressable onPress={onNextPress}>
            <Icon name="long-arrow-right" size={30} color={colors.secondary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ONBOARDING_BACKGROUND,
  },
  text: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.7,
    fontWeight: '500',
  },
  scrollViewContainer: {
    flex: 1,
  },
  footer: {
    height: 50,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  fillCenter: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipContainer: {
    position: 'absolute',
    zIndex: 1,
    right: 16,
  },
  skip: {
    color: colors.secondary,
    fontSize: 14,
  },
});
