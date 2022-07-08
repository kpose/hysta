import {StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {IEnterPasswordScreenProps} from './interfaces';
import Screen from '../../components/Screen/Screen';
import TextInput from '../../components/TextInput/TextInput';
import Text, {ScreenTitle} from '../../components/Text/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/colors';
import Button from '../../components/Button/Button';
import {isEmail} from '../../configs/rules.config';

const EnterPasswordScreen: IEnterPasswordScreenProps = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    /* check input validity */
    if (!email) {
      return setErrorMessage('Please enter your email address');
    }
    let valid = isEmail(email);
    if (!valid) {
      return setErrorMessage('Please enter a valid email address');
    } else {
      return setErrorMessage('');
    }
  }, [email]);

  const onChangeText = useCallback((v: string) => {
    setEmail(v);
  }, []);

  return (
    <Screen style={styles.container}>
      <ScreenTitle style={styles.title}>Enter your Email Address</ScreenTitle>
      <Text style={styles.description}>
        Enter the email address to register your account
      </Text>

      <TextInput
        onChangeText={v => onChangeText(v)}
        value={email}
        placeholder="Email"
        errorMessage={errorMessage}
        autoFocus
        keyboardType="email-address"
      />

      <Button
        style={styles.continueButton}
        title="Continue"
        onPress={onContinuePress}
        // disabled={checkIsValid()}
      />
    </Screen>
  );
};

export default EnterPasswordScreen;

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