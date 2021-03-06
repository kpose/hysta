import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Onboarding from '../screens/Onboarding/Onboarding';
import Landing from '../screens/Landing/Landing';
import {StyleSheet, Platform} from 'react-native';
import {IOnboardingStackParamList} from './interfaces';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
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
      initialRouteName={isOnboarded ? 'Landing' : 'Onboarding'}
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
        component={Landing}
        options={{headerTitle: '', gestureEnabled: false}}
      />

      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{headerTitle: ''}}
      />
      {/* <Stack.Screen
        name="OnboardingQuestions"
        component={OnboardingQuestions}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="AppStack"
        component={AppStack}
        options={{headerTitle: ''}}
      /> */}
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
