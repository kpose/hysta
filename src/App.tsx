/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {ThemeProvider} from './providers/ThemeProvider';
import {UserProvider} from './providers/UserProvider';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <ThemeProvider>
      <PaperProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <UserProvider>
            <RootNavigator />
          </UserProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default App;
