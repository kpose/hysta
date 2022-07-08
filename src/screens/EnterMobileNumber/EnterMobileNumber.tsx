import {StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {IEnterMobileNumberProps} from './interfaces';
import Screen from '../../components/Screen/Screen';
import Text, {ScreenTitle} from '../../components/Text/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/colors';
import PhoneInput from 'react-native-phone-number-input';
import Button from '../../components/Button/Button';

const EnterMobileNumber: IEnterMobileNumberProps = ({navigation}) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef<PhoneInput>(null);

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const BackButton = useCallback(() => {
    return (
      <Pressable style={styles.backButton} onPress={onBackPress}>
        <Icon name="angle-left" size={25} color={colors.primary} />
        <Text style={styles.backText}>Back</Text>
      </Pressable>
    );
  }, [onBackPress]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return <BackButton />;
      },
    });
  }, [BackButton, navigation]);

  const onContinuePress = useCallback(() => {
    if (!value) {
      return;
    }
  }, [value]);

  const checkIsValid = useCallback(() => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    if (checkValid) {
      return false;
    }
    return true;
  }, [value]);

  return (
    <Screen style={styles.container}>
      <ScreenTitle style={styles.title}>Enter your mobile number</ScreenTitle>
      <Text style={styles.description}>
        Enter the mobile number to register the account
      </Text>

      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="NG"
        layout="first"
        onChangeText={text => {
          setValue(text);
        }}
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        containerStyle={styles.phoneInput}
        textContainerStyle={styles.phoneTextContainer}
        withDarkTheme
        withShadow
        autoFocus
      />

      <Button
        style={styles.continueButton}
        title="Continue"
        onPress={onContinuePress}
        disabled={checkIsValid()}
      />
    </Screen>
  );
};

export default EnterMobileNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  phoneTextContainer: {
    borderRadius: 5,
  },
  continueButton: {
    marginTop: 30,
  },
  phoneInput: {
    width: '100%',
    marginTop: 30,
    borderRadius: 5,
  },
  title: {
    marginTop: 20,
  },
  description: {
    color: colors.light_grey,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.primary,
    alignSelf: 'center',
  },
});
