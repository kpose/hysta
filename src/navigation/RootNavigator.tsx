import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import OnboardingStack from './OnboardingStack';
import {useThemeContext} from '../providers/ThemeProvider';
import {ActivityIndicator} from 'react-native';
import {CustomDarkTheme, CustomLightTheme} from '../utils/ThemeColors';
import {Provider as PaperProvider} from 'react-native-paper';
import {colors} from '../utils/colors';
import {useUserContext} from '../providers/UserProvider';
import HomeBottomTab from './HomeBottomTab';

const linking = {
  prefixes: ['wings://'],
};

function RootNavigator() {
  const {dark} = useThemeContext();
  const {user} = useUserContext();
  return (
    <PaperProvider theme={dark ? CustomDarkTheme : CustomLightTheme}>
      <NavigationContainer
        theme={dark ? CustomDarkTheme : CustomLightTheme}
        fallback={<ActivityIndicator color={colors.primary} size="large" />}
        linking={linking}>
        {user ? <HomeBottomTab /> : <OnboardingStack />}
      </NavigationContainer>
    </PaperProvider>
  );
}

export default RootNavigator;
