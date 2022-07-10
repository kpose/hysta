/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {ThemeProvider} from './providers/ThemeProvider';
import {UserProvider} from './providers/UserProvider';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WalletConnectProvider} from '@walletconnect/react-native-dapp/dist/providers';
import Web3 from 'web3';
import {linking} from './configs/linking.config';
import {ethers} from 'ethers';

const web3 = new Web3('http://localhost:7545');
const newWallet = web3.eth.accounts.wallet.create(1);
const newAccount = newWallet[0];
console.log(newAccount);
console.log(ethers.version);

const App = () => {
  return (
    <ThemeProvider>
      <PaperProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <WalletConnectProvider
            redirectUrl={linking.prefixes[0]}
            storageOptions={{asyncStorage: AsyncStorage}}>
            <UserProvider>
              <RootNavigator />
            </UserProvider>
          </WalletConnectProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default App;
