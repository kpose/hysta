import {StyleSheet, Text, Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, {useCallback} from 'react';
import Screen from '../../components/Screen/Screen';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import Button from '../../components/Button/Button';

const Home = () => {
  const connector = useWalletConnect();
  const logOut = useCallback(() => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }, []);

  const onConnectPress = useCallback(() => {
    try {
      if (!connector.connected) {
        connector.connect().then(x => {
          console.log(x);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [connector]);

  return (
    <Screen style={styles.container}>
      <Pressable onPress={logOut}>
        <Text>logout</Text>
        <Button title="Connect" onPress={onConnectPress} />
      </Pressable>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
