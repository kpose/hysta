import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import OnboardingStack from './OnboardingStack';
import UserStack from './UserStack';
import {useThemeContext} from '../providers/ThemeProvider';
import {ActivityIndicator} from 'react-native';
import {CustomDarkTheme, CustomLightTheme} from '../utils/ThemeColors';
import {Provider as PaperProvider} from 'react-native-paper';
import {colors} from '../utils/colors';
import {useUserContext} from '../providers/UserProvider';
import {linking} from '../configs/linking.config';

function RootNavigator() {
  const {dark} = useThemeContext();
  const {user} = useUserContext();
  return (
    <PaperProvider theme={dark ? CustomDarkTheme : CustomLightTheme}>
      <NavigationContainer
        theme={dark ? CustomDarkTheme : CustomLightTheme}
        fallback={<ActivityIndicator color={colors.primary} size="small" />}
        linking={linking}>
        {user ? <UserStack /> : <OnboardingStack />}
      </NavigationContainer>
    </PaperProvider>
  );
}

export default RootNavigator;
