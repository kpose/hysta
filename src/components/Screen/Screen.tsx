import {StyleSheet, SafeAreaView as RNView} from 'react-native';
import React, {FC} from 'react';
import {ViewProps} from './interfaces';

const Screen: FC<ViewProps> = function Screen({style, ...props}) {
  return <RNView style={[styles.base, style]} {...props} />;
};

export default Screen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    marginHorizontal: 16,
  },
});
