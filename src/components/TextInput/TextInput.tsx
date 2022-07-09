import {StyleSheet, View, TextInput as RNTextInput} from 'react-native';
import React from 'react';
import Text from '../Text/Text';
import {TextInputProps} from './interfaces';
import {colors} from '../../utils/colors';

const TextInput: React.FC<TextInputProps> = ({
  style,
  errorMessage,
  rightContent,
  ...props
}) => {
  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          {borderColor: errorMessage ? colors.danger : colors.light_grey},
        ]}>
        <RNTextInput style={[styles.input, style]} {...props} />
        {rightContent}
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    marginTop: 18,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    width: '90%',
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
  },
});
