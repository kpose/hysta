import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Onboarding from '../screens/Onboarding/Onboarding';
import {StyleSheet, Platform} from 'react-native';
import {IOnboardingStackParamList} from './interfaces';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import EnterEmailScreen from '../screens/EnterEmailScreen/EnterEmailScreen';
import EnterMobileNumber from '../screens/EnterMobileNumber/EnterMobileNumber';
import EnterPasswordScreen from '../screens/EnterPasswordScreen/EnterPasswordScreen';
import EnterNameScreen from '../screens/EnterNameScreen/EnterNameScreen';

import {getItem} from '../utils/storage';
import {Screen} from 'react-native-screens';
import {ActivityIndicator} from 'react-native-paper';

const Stack = createNativeStackNavigator<IOnboardingStackParamList>();

function OnboardingStack() {
  const [isOnboarded, setIsOnboarded] = useState<boolean>();

  useEffect(() => {
    const isOnboardingComplete = async () => {
      const statusJson = await getItem('onboarding');
      const status = await JSON.parse(statusJson);
      setIsOnboarded(status);
    };
    isOnboardingComplete();
  }, []);

  if (isOnboarded === undefined) {
    return (
      <Screen style={styles.loading}>
        <ActivityIndicator size={'small'} animating={true} />
      </Screen>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isOnboarded ? 'AuthScreen' : 'Onboarding'}
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: Platform.select({ios: 'center'}),
        headerTransparent: true,
      }}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="Landing"
        component={AuthScreen}
        options={{headerTitle: '', gestureEnabled: false}}
      />

      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="EnterMobileNumber"
        component={EnterMobileNumber}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="EnterEmailScreen"
        component={EnterEmailScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="EnterPasswordScreen"
        component={EnterPasswordScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="EnterNameScreen"
        component={EnterNameScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  guideHeaderRight: {
    paddingLeft: 60,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 26,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingStack;
