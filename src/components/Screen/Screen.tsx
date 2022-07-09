import {StyleSheet, SafeAreaView as RNView} from 'react-native';
import React, {FC} from 'react';
import {ViewProps} from './interfaces';
import {useHeaderHeight} from '@react-navigation/elements';

const Screen: FC<ViewProps> = function Screen({style, ...props}) {
  // const headerHeight = useHeaderHeight();
  return (
    <RNView
      style={[styles.base, style /*  {marginTop: headerHeight} */]}
      {...props}
    />
  );
};

// ADD STATUSBAR
export default Screen;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    marginHorizontal: 16,
  },
});
