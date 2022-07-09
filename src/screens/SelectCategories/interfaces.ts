import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IUserStackParamList} from '../../navigation/interfaces';

export type ISelectCategoriesProps = React.FC<
  NativeStackScreenProps<IUserStackParamList, 'SelectCategories'> & {}
>;
