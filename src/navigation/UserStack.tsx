import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Platform, ActivityIndicator} from 'react-native';
import {IUserStackParamList} from './interfaces';
import HomeBottomTab from './HomeBottomTab';
import Screen from '../components/Screen/Screen';
import UserLevelScreen from '../screens/UserLevelScreen/UserLevelScreen';
import SelectCategories from '../screens/SelectCategories/SelectCategories';
import {useUserContext} from '../providers/UserProvider';

const Stack = createNativeStackNavigator<IUserStackParamList>();

function UserStack() {
  const {userData} = useUserContext();
  const [isComplete, setIsComplete] = useState<boolean>();

  useEffect(() => {
    if (!userData) {
      setIsComplete(false);
      return;
    }
    if (!userData.fundingLevel || !userData.projectCategories) {
      setIsComplete(false);
      return;
    }
    return setIsComplete(true);
  }, [userData]);

  if (!isComplete) {
    return (
      <Screen style={styles.loading}>
        <ActivityIndicator size={'small'} animating={true} />
      </Screen>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isComplete ? 'HomeBottomTab' : 'UserLevelScreen'}
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
        name="SelectCategories"
        component={SelectCategories}
        options={{
          headerTitle: 'Welcome to Hysta',
          headerTransparent: false,
          gestureEnabled: false,
        }}
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 26,
  },
});

export default UserStack;
