import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IOnboardingStackParamList} from '../../navigation/interfaces';

export interface IUserInfo {
  email: string;
  password: string;
  fullname: string;
}

export type IInputDataFieeld = 'email' | 'password' | 'fullname';

export type IAuthScreenProps = React.FC<
  NativeStackScreenProps<IOnboardingStackParamList, 'AuthScreen'> & {}
>;
