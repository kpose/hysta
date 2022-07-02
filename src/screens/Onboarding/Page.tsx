import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import {OnboardingPageProps} from './Constants';
import {Text} from '../../components/Text/Text';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PageProps {
  page: OnboardingPageProps;
  translateX: Animated.SharedValue<number>;
  index: number;
}

const {height: PAGE_HEIGHT, width: PAGE_WIDTH} = Dimensions.get('window');
const CIRCLE_WIDTH = PAGE_WIDTH * 0.7;

const Page: React.FC<PageProps> = ({page, translateX, index}) => {
  const inputRange = [
    (index - 1) * PAGE_WIDTH,
    index * PAGE_WIDTH,
    (index + 1) * PAGE_WIDTH,
  ];

  const rCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale}],
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );
    const progress = interpolate(
      translateX.value,
      inputRange,
      [0, 0, 1],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{rotate: `${progress * Math.PI}rad`}],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
        <Animated.Image
          source={page.source}
          style={[styles.image, rImageStyle]}
          resizeMode={'contain'}
        />
      </View>
      <Text weight="bold" style={styles.title}>
        {page.title}
      </Text>
      <Text style={styles.description}>{page.description}</Text>
    </View>
  );
};

export {PAGE_WIDTH};

export default Page;

const styles = StyleSheet.create({
  container: {
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  circleContainer: {
    width: CIRCLE_WIDTH,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 120,
  },
  circle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#219EBC',
    // backgroundColor: 'grey',
    borderRadius: CIRCLE_WIDTH / 2,
  },
  image: {
    height: PAGE_HEIGHT * 0.5,
    aspectRatio: 1,
    position: 'absolute',
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 10,
    fontSize: 20,
  },
  description: {
    textAlign: 'center',
    color: 'grey',
  },
});
