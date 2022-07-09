import {StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {IEnterPasswordScreenProps} from './interfaces';
import Screen from '../../components/Screen/Screen';
import TextInput from '../../components/TextInput/TextInput';
import Text, {ScreenTitle} from '../../components/Text/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/colors';
import Button from '../../components/Button/Button';
import {isStrongCharacterCombo} from '../../configs/rules.config';

const EnterPasswordScreen: IEnterPasswordScreenProps = ({
  navigation,
  route: {
    params: {email},
  },
}) => {
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);

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
    if (!password) {
      return setErrorMessage('Please enter your password');
    }
    let valid = isStrongCharacterCombo(password);
    if (!valid) {
      return setErrorMessage(
        'Your password should contain at least one uppercase, one lowercase and a special character.',
      );
    } else {
      setErrorMessage('');
    }
    navigation.navigate('EnterNameScreen', {email, password});
  }, [email, navigation, password]);

  const onChangeText = useCallback((v: string) => {
    setPassword(v);
  }, []);

  const toggleSecureEntry = useCallback(() => {
    setIsSecureEntry(!isSecureEntry);
  }, [isSecureEntry]);

  const renderRightContent = () => {
    if (isSecureEntry) {
      return (
        <Pressable onPress={toggleSecureEntry}>
          <Icon name="eye-slash" size={25} color={colors.primary} />
        </Pressable>
      );
    }
    return (
      <Pressable onPress={toggleSecureEntry}>
        <Icon name="eye" size={25} color={colors.primary} />
      </Pressable>
    );
  };

  return (
    <Screen style={styles.container}>
      <ScreenTitle style={styles.title}>Set Password</ScreenTitle>
      <Text style={styles.description}>
        Namaste! We are almost done. Set your password below
      </Text>

      <TextInput
        onChangeText={v => onChangeText(v)}
        value={password}
        placeholder="Enter password"
        errorMessage={errorMessage}
        autoFocus
        secureTextEntry={isSecureEntry}
        rightContent={renderRightContent()}
      />

      <Button
        style={styles.continueButton}
        title="Continue"
        onPress={onContinuePress}
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
