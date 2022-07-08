import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Onboarding from '../screens/Onboarding/Onboarding';
import Landing from '../screens/Landing/Landing';
import {StyleSheet, Platform} from 'react-native';
import {IOnboardingStackParamList} from './interfaces';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import EnterEmailScreen from '../screens/EnterEmailScreen/EnterEmailScreen';
import EnterMobileNumber from '../screens/EnterMobileNumber/EnterMobileNumber';
import EnterPasswordScreen from '../screens/EnterPasswordScreen/EnterPasswordScreen';
// import OnboardingQuestions from '../screens/OnboardingQuestions/OnboardingQuestions';
// import AppStack from './AppStack';
import {getItem} from '../utils/storage';

const Stack = createNativeStackNavigator<IOnboardingStackParamList>();

function OnboardingStack() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>();

  useEffect(() => {
    const isOnboardingComplete = async () => {
      const statusJson = await getItem('onboarding');
      const status = await JSON.parse(statusJson);
      setIsOnboarded(status);
    };
    isOnboardingComplete();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: Platform.select({ios: 'center'}),
        headerTransparent: true,
      }}>
      {isOnboarded ? null : (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerTitle: ''}}
        />
      )}
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
});

export default OnboardingStack;
