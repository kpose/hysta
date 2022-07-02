import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ILandingScreenProps} from './interfaces';
import Text from '../../components/Text/Text';
import {useHeaderHeight} from '@react-navigation/elements';
import {ScreenTitle} from '../../components/Text/Text';
import Button from '../../components/Button/Button';
// import {useWalletConnect} from '@walletconnect/react-native-dapp';
// import {BottomSheetRefProps} from '../../components/BottomSheetModal/BottomSheetModal';
// import BottomSheetModal from '../../components/BottomSheetModal/BottomSheetModal';

const Welcome: ILandingScreenProps = ({navigation}) => {
  const headerHeight = useHeaderHeight();
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.header, {marginTop: headerHeight + 30}]}>
          <ScreenTitle style={styles.brand}>Wings</ScreenTitle>
        </View>
        <View style={styles.infoContainer}>
          <Text weight="bold">Would you like to...</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Support a project"
              style={styles.button}
              onPress={() =>
                navigation.navigate('AuthScreen', {isSignup: true})
              }
            />
            <Button
              type="secondary"
              title="Start a project"
              onPress={() =>
                navigation.navigate('AuthScreen', {isSignup: false})
              }
            />
          </View>
          <View style={styles.bottom}>
            <Text weight="bold">Or</Text>
            <Button
              style={styles.bottomButton}
              type="neutral"
              title="Just exploring"
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  brand: {
    fontSize: 40,
  },
  actionbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  header: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  infoContainer: {
    marginTop: 70,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    marginBottom: 20,
  },
  bottom: {
    alignItems: 'center',
    marginTop: 40,
  },
  bottomButton: {
    marginTop: 10,
  },
  modalContainer: {
    padding: 16,
  },
  modalButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});

//   const connector = useWalletConnect();
//   const bottomSheetRef = useRef<BottomSheetRefProps>(null);

//   const onStartPress = () => {
//     const isActive = bottomSheetRef.current?.isActive();
//     if (isActive) {
//       return;
//     }
//     if (!connector.connected) {
//       return bottomSheetRef.current?.scrollTo(-200);
//     }
//     navigation.navigate('OnboardingQuestions');
//   };

//   const onConnectPress = useCallback(() => {
//     bottomSheetRef.current?.scrollTo(0);
//     connector.connect();
//   }, []);
//   const onIgnorePress = useCallback(() => {
//     bottomSheetRef.current?.scrollTo(0);
//   }, []);

{
  /* <BottomSheetModal ref={bottomSheetRef}>
        <View style={styles.modalContainer}>
          <Text stylish style={{textAlign: 'center'}}>
            To enable us charge you whenever you authorize, we will like you to
            connect your wallet
          </Text>
          <View style={styles.modalButtons}>
            <Pressable style={styles.actionbutton} onPress={onIgnorePress}>
              <Text style={{color: AppColors.secondary}}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.actionbutton} onPress={onConnectPress}>
              <Text style={{color: AppColors.primary}}>Connect</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetModal> */
}
