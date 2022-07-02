import {TextInputProps as RNTextInputProps} from 'react-native';

export interface TextInputProps extends RNTextInputProps {
  stylish?: boolean;
  error?: boolean;
  errorMessage?: string;
}
