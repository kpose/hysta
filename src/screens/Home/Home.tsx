import {StyleSheet, Text, View, Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, {useCallback} from 'react';

const Home = () => {
  const logOut = useCallback(() => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Pressable onPress={logOut}>
        <Text>Home</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
