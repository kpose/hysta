import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  Dimensions,
} from 'react-native';
import React from 'react';
import Text from '../Text/Text';
import {TextInputProps} from './interfaces';
import {colors} from '../../utils/colors';
const {width: PAGE_WIDTH} = Dimensions.get('window');

const TextInput: React.FC<TextInputProps> = ({
  style,
  errorMessage,
  ...props
}) => {
  return (
    <View>
      <RNTextInput
        style={[
          styles.input,
          {
            borderColor: errorMessage ? colors.danger : colors.light_grey,
          },
          style,
        ]}
        {...props}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    marginTop: 18,
    marginBottom: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
  },
});
