import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface DotProps {
  index: number;
  activeDotIndex: Animated.SharedValue<number>;
}

const Dot: React.FC<DotProps> = ({activeDotIndex, index}) => {
  const rDotStyle = useAnimatedStyle(() => {
    const isActive = activeDotIndex.value === index;
    return {
      width: withTiming(isActive ? 30 : 20, {
        duration: 150,
      }),
      backgroundColor: withTiming(isActive ? '#219EBC' : 'white', {
        duration: 150,
      }),
    };
  });
  return <Animated.View style={[styles.dot, rDotStyle]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
});
