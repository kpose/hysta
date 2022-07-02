import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {HomeBottomTabParamList} from './interfaces';
import Home from '../screens/Home/Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utils/colors';
import {useThemeContext} from '../providers/ThemeProvider';

const Tab = createMaterialBottomTabNavigator<HomeBottomTabParamList>();

function HomeBottomTab() {
  const {dark} = useThemeContext();
  return (
    <Tab.Navigator
      labeled={false}
      activeColor={colors.primary}
      shifting={true}
      sceneAnimationEnabled={false}
      inactiveColor="#95a5a6"
      // eslint-disable-next-line react-native/no-inline-styles
      barStyle={{backgroundColor: dark ? '#37474f' : '#DEE4E7'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="compass" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Project"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="plus-square" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="bell" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="user" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeBottomTab;
