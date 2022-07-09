import {StyleSheet, Pressable, Alert, Keyboard} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {IEnterNameScreenProps} from './interfaces';
import Screen from '../../components/Screen/Screen';
import TextInput from '../../components/TextInput/TextInput';
import Text, {ScreenTitle} from '../../components/Text/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/colors';
import Button from '../../components/Button/Button';
import {isValidName} from '../../configs/rules.config';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Snackbar} from 'react-native-paper';

const EnterNameScreen: IEnterNameScreenProps = ({
  navigation,
  route: {
    params: {email, password},
  },
}) => {
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isSnackBar, setIsSnackBar] = useState<{
    status: boolean;
    message: string;
  }>({
    status: false,
    message: '',
  });

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

  const createUser = useCallback(() => {
    if (!email || !password || !name) {
      return;
    }
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('Users')
          .add({
            email: email.toLowerCase(),
            fullname: name,
          })
          .then(() => {
            setLoading(false);
            Alert.alert('Congratulations, account creation successful!');
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setIsSnackBar({
            status: true,
            message: 'The provided email address is already in use!',
          });
        }
        if (error.code === 'auth/invalid-email') {
          setIsSnackBar({
            status: true,
            message: 'The provided email address is invalid!',
          });
        }
        setLoading(false);
      });
  }, [email, name, password]);

  const onContinuePress = useCallback(() => {
    /* check input validity */
    if (!name) {
      return setErrorMessage('Please enter your first and last name ');
    }
    let valid = isValidName(name);
    if (!valid) {
      return setErrorMessage('Please enter your first and last name');
    } else {
      setErrorMessage('');
    }
    Keyboard.dismiss();
    createUser();
  }, [createUser, name]);

  const onChangeText = useCallback((v: string) => {
    setName(v);
  }, []);

  const onSnackPress = useCallback(() => {
    navigation.navigate('EnterEmailScreen', {isEmailError: isSnackBar.message});
  }, [isSnackBar.message, navigation]);

  const onDismissSnackBar = useCallback(() => {
    if (isSnackBar.status) {
      setIsSnackBar({
        status: false,
        message: '',
      });
    }
  }, [isSnackBar.status]);

  return (
    <Screen style={styles.container}>
      <ScreenTitle style={styles.title}>What can we call you?</ScreenTitle>
      <Text style={styles.description}>Please enter your name below</Text>

      <TextInput
        onChangeText={v => onChangeText(v)}
        value={name}
        placeholder="Enter name"
        errorMessage={errorMessage}
        autoFocus
      />

      <Snackbar
        visible={isSnackBar.status}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Fix',
          onPress: () => {
            onSnackPress();
          },
        }}>
        {isSnackBar.message}
      </Snackbar>

      <Button
        style={styles.continueButton}
        title="Confirm"
        onPress={onContinuePress}
        loading={loading}
        disabled={loading}
      />
    </Screen>
  );
};

export default EnterNameScreen;

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
