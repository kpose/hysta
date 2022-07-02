import {PressableProps as PressableProps, ViewStyle} from 'react-native';

export type ButtonType = 'primary' | 'secondary' | 'neutral';

export interface ButtonProps extends PressableProps {
  title: string;
  style?: ViewStyle;
  type?: ButtonType;
  loading?: boolean;
}
