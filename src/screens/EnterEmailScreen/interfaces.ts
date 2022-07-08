import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IOnboardingStackParamList} from '../../navigation/interfaces';

export type IEnterEmailScreenProps = React.FC<
  NativeStackScreenProps<IOnboardingStackParamList, 'EnterEmailScreen'> & {}
>;
