import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {IUserStackParamList} from './interfaces';
import HomeBottomTab from './HomeBottomTab';
import {getItem} from '../utils/storage';
import UserLevelScreen from '../screens/UserLevelScreen/UserLevelScreen';

const Stack = createNativeStackNavigator<IUserStackParamList>();

function UserStack() {
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
      <Stack.Screen
        name="UserLevelScreen"
        component={UserLevelScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="HomeBottomTab"
        component={HomeBottomTab}
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

export default UserStack;
