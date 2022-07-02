import {
  StyleSheet,
  Pressable as PButton,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {ButtonProps, ButtonType} from './interfaces';
import {colors} from '../../utils/colors';
import Text from '../Text/Text';
const {width: PAGE_WIDTH} = Dimensions.get('window');

const getBackgroundColor = (type?: ButtonType) => {
  switch (type) {
    case 'primary':
      return styles.primary;
    case 'secondary':
      return styles.secondary;
    case 'neutral':
      return styles.neutral;
    default:
      return null;
  }
};

const getFontWeight = (type?: ButtonType) => {
  switch (type) {
    case 'neutral':
      return styles.neutralText;
    default:
      return null;
  }
};

const Button: React.FC<ButtonProps> = function Button({
  style,
  title,
  type,
  loading,
  disabled,
  ...props
}) {
  return (
    <PButton
      style={[
        styles.button,
        {backgroundColor: disabled ? colors.light_grey : colors.primary},
        style,
        getBackgroundColor(type),
      ]}
      {...props}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={colors.secondary}
          animating={true}
        />
      ) : null}
      <Text weight="medium" style={[styles.buttonText, getFontWeight(type)]}>
        {title}
      </Text>
    </PButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: PAGE_WIDTH / 1.3,
    // backgroundColor: colors.primary,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  neutral: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: '',
  },
  neutralText: {
    color: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
