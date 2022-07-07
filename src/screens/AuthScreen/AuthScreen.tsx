import {
  SafeAreaView,
  StyleSheet,
  View,
  //   TextInput,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {IAuthScreenProps, IInputDataFieeld, IUserInfo} from './interfaces';
import Text from '../../components/Text/Text';
import {colors} from '../../utils/colors';
import Button from '../../components/Button/Button';
import {useUserContext} from '../../providers/UserProvider';
import auth from '@react-native-firebase/auth';
import TextInput from '../../components/TextInput/TextInput';
import firestore from '@react-native-firebase/firestore';
import {
  isEmail,
  isStrongCharacterCombo,
  isValidName,
} from '../../configs/rules.config';
const {width: PAGE_WIDTH} = Dimensions.get('window');

const AuthScreen: IAuthScreenProps = ({route, navigation}) => {
  const {isSignup} = route.params;
  const {user} = useUserContext();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    email: '',
    password: '',
    fullname: '',
  });

  const [errorMessage, setErrorMessage] = useState<IUserInfo>({
    email: '',
    password: '',
    fullname: '',
  });

  const createUser = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(() => {
        firestore()
          .collection('Users')
          .add({
            email: userInfo.email,
            fullname: userInfo.fullname,
          })
          .then(() => {
            Alert.alert('Congratulations, account creation successful!');
            setLoading(false);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        setLoading(false);
      });
  }, [loading, userInfo.email, userInfo.fullname, userInfo.password]);

  const checkInputValidity = useCallback(
    (field: IInputDataFieeld) => {
      if (field === 'email') {
        if (!userInfo.email) {
          return setErrorMessage({
            ...userInfo,
            email: 'Please enter your email address',
          });
        }
        let valid = isEmail(userInfo.email);
        if (!valid) {
          return setErrorMessage({
            ...userInfo,
            email: 'Please enter a valid email address',
          });
        }
        return setErrorMessage({
          ...userInfo,
          email: '',
        });
      }
      if (field === 'password') {
        if (!userInfo.password) {
          return setErrorMessage({
            ...userInfo,
            password: 'Please enter your password',
          });
        }
        let valid = isStrongCharacterCombo(userInfo.password);
        if (!valid) {
          return setErrorMessage({
            ...userInfo,
            password:
              'Your password should contain at least one uppercase, one lowercase and a special character.',
          });
        }
        return setErrorMessage({
          ...userInfo,
          password: '',
        });
      }
      if (field === 'fullname') {
        if (!userInfo.fullname) {
          return setErrorMessage({
            ...userInfo,
            fullname: 'Please provide your fullname.',
          });
        }
        let valid = isValidName(userInfo.fullname);
        if (!valid) {
          return setErrorMessage({
            ...userInfo,
            fullname: 'Please enter a valid first and last name',
          });
        }
        return setErrorMessage({
          ...userInfo,
          fullname: '',
        });
      }
    },
    [userInfo],
  );

  const loginUser = useCallback(() => {
    console.log('lolo');
  }, []);

  const onButtonPress = useCallback(() => {
    if (isSignup) {
      if (!userInfo.email || !userInfo.fullname || !userInfo.password) {
        return;
      }
      return createUser();
    } else {
      if (!userInfo.email || !userInfo.password) {
        return;
      }
      return loginUser();
    }
  }, [
    createUser,
    isSignup,
    loginUser,
    userInfo.email,
    userInfo.fullname,
    userInfo.password,
  ]);

  const onChangeText = useCallback(
    (field: IInputDataFieeld, value: string) => {
      return setUserInfo({
        ...userInfo,
        [field]: value,
      });
    },
    [userInfo],
  );

  const isButtonDisabled = useCallback(() => {
    const {email, password, fullname} = errorMessage;
    if (loading) {
      return true;
    }
    if (email || password || fullname) {
      return true;
    }
    if (
      !userInfo.email ||
      !userInfo.password ||
      (isSignup && !userInfo.fullname)
    ) {
      return true;
    }
    return false;
  }, [
    errorMessage,
    isSignup,
    loading,
    userInfo.email,
    userInfo.fullname,
    userInfo.password,
  ]);

  const openLogin = useCallback(() => {
    navigation.setParams({isSignup: false});
  }, [navigation]);

  const openSignup = useCallback(() => {
    navigation.setParams({isSignup: true});
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text stylish style={styles.logo}>
          Hysta
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {isSignup ? (
          <TextInput
            onChangeText={v => onChangeText('fullname', v)}
            value={userInfo.fullname}
            placeholder="Full name"
            onSubmitEditing={() => checkInputValidity('fullname')}
            errorMessage={errorMessage.fullname}
          />
        ) : null}
        <TextInput
          onChangeText={v => onChangeText('email', v)}
          value={userInfo.email}
          placeholder="Email"
          onSubmitEditing={() => checkInputValidity('email')}
          errorMessage={errorMessage.email}
        />
        <TextInput
          onChangeText={v => onChangeText('password', v)}
          value={userInfo.password}
          placeholder="Password"
          onSubmitEditing={() => checkInputValidity('password')}
          errorMessage={errorMessage.password}
        />
      </View>
      <Button
        loading={loading}
        disabled={isButtonDisabled()}
        title={isSignup ? 'Join now' : 'Login'}
        style={styles.buttonContainer}
        onPress={onButtonPress}
      />
      <View style={styles.footerContainer}>
        {isSignup ? (
          <Pressable onPress={openLogin}>
            <Text style={styles.fotterText}>
              Already have an account?
              <Text
                weight="bold"
                style={[styles.fotterText, {color: colors.secondary}]}>
                {' '}
                Login
              </Text>
            </Text>
          </Pressable>
        ) : (
          <Pressable onPress={openSignup}>
            <Text style={styles.fotterText}>
              New to Hysta?
              <Text
                weight="bold"
                style={[styles.fotterText, {color: colors.secondary}]}>
                {' '}
                Join now
              </Text>
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  containerMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 30,
  },
  fotterText: {
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 50,
  },
  logo: {
    fontSize: 24,
  },
  logoContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: PAGE_WIDTH / 1.2,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: colors.light_grey,
    borderRadius: 5,
  },
});
