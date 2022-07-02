import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {useThemeContext} from '../../providers/ThemeProvider';
import {CustomDarkTheme, CustomLightTheme} from '../../utils/ThemeColors';
import {TextProps, FontWeight} from './interfaces';

/**
 * This gets the font style for the text component,
 * defaults to book font style.
 * @param weight FontWeight
 */
const getFontWeight = (weight?: FontWeight) => {
  switch (weight) {
    case 'light':
      return styles.light;
    case 'medium':
      return styles.medium;
    case 'bold':
      return styles.bold;
    default:
      return null;
  }
};

export const Text: React.FC<TextProps> = function Text({
  weight,
  style,
  stylish,
  ...props
}) {
  const {dark} = useThemeContext();
  return (
    <RNText
      style={[
        styles.base,
        {
          color: dark
            ? CustomDarkTheme.colors.text
            : CustomLightTheme.colors.text,
        },
        style,
        getFontWeight(weight),
        stylish ? styles.stylish : undefined,
      ]}
      {...props}
    />
  );
};

export const ScreenTitle: React.FC<Omit<TextProps, 'weight' | 'stylish'>> =
  function ScreenTitle({children, style, ...props}) {
    return (
      <Text
        {...props}
        stylish
        style={[styles.screenTitle, style, styles.screenTitleFixed]}>
        {children}
      </Text>
    );
  };

const styles = StyleSheet.create({
  stylish: {
    // fontFamily: 'SecularOne-Regular',
  },
  screenTitle: {
    marginBottom: 8,
  },
  screenTitleFixed: {
    fontSize: 24,
  },
  base: {
    fontSize: 16,
    // fontFamily: 'Roboto-Regular',
  },
  light: {
    // fontFamily: 'Roboto-Light',
  },
  medium: {
    // fontFamily: 'Roboto-Medium',
  },
  bold: {
    // fontFamily: 'Roboto-Bold',
  },
});

export default Text;
