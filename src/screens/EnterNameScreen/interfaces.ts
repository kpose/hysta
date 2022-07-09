import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IOnboardingStackParamList} from '../../navigation/interfaces';

export type IEnterNameScreenProps = React.FC<
  NativeStackScreenProps<IOnboardingStackParamList, 'EnterNameScreen'> & {}
>;
