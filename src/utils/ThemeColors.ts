import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

export const CustomDarkTheme = {
  ...PaperDarkTheme,
  ...DarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...DarkTheme.colors,
    primary: '#2a9d8f',
    background: '#121111',
    text: '#ffffff',
    danger: '#BF0000',
  },
};

export const CustomLightTheme = {
  ...PaperDefaultTheme,
  ...DefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...DefaultTheme.colors,
    primary: '#2a9d8f',
    background: '#DEE4E7',
    danger: '#BF0000',
  },
};
