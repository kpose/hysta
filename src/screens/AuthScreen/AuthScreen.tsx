import {StyleSheet, View, Image} from 'react-native';
import Text from '../../components/Text/Text';
import React from 'react';

import Screen from '../../components/Screen/Screen';
import {colors} from '../../utils/colors';
import Button from '../../components/Button/Button';

const AuthScreen = () => {
  return (
    <Screen style={styles.container}>
      <Text stylish style={styles.title}>
        Sign up to get started
      </Text>
      <Text style={styles.description}>
        Sign up to access a wide range of pproducts and experiences
      </Text>
      <View style={styles.buttonsContainer}>
        <Button title="Sign Up using Mobile Number" />
        <Button title="Sign Up using Email" />
        <View style={styles.socialContainer}>
          <Image
            style={styles.socialImage}
            source={require('../../assets/images/google.jpeg')}
          />
          <Image
            style={styles.socialImage}
            source={require('../../assets/images/facebook.png')}
          />
          <Image
            style={styles.socialImage}
            source={require('../../assets/images/apple.png')}
          />
        </View>
        <Text style={styles.signInText}>
          Already a member?{' '}
          <Text weight="bold" style={styles.signIn}>
            Sign in
          </Text>
        </Text>
      </View>
    </Screen>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  socialImage: {
    height: 40,
    width: 40,
    borderRadius: 5,
    margin: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
  },
  description: {
    marginTop: 10,
    color: colors.light_grey,
  },
  buttonsContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 80,
    left: 0,
    right: 0,
  },
  signInText: {
    alignSelf: 'center',
    marginTop: 20,
  },
  signIn: {
    color: colors.primary,
  },
});
