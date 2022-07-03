/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {ThemeProvider} from './providers/ThemeProvider';
import {UserProvider} from './providers/UserProvider';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Web3 from 'web3';

const web3 = new Web3('http://localhost:7545');
const newWallet = web3.eth.accounts.wallet.create(1);
const newAccount = newWallet[0];
console.log(newAccount);

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
