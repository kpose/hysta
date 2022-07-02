import {TextProps as RNTextProps} from 'react-native';

export type FontWeight = 'light' | 'medium' | 'bold';

export interface TextProps extends RNTextProps {
  weight?: FontWeight;
  stylish?: boolean;
}
