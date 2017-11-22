import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import Compose from '../screens/Compose';
import Inbox from '../screens/Inbox';
import Profile from '../screens/Profile';

export default TabNavigator(
  {
    Compose: {
      screen: Compose,
    },
    Inbox: {
      screen: Inbox,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Compose':
            iconName =
              Platform.OS === 'ios'
                ? `ios-create${focused ? '' : '-outline'}`
                : 'md-create';
            break;
          case 'Inbox':
            iconName = Platform.OS === 'ios' ? `ios-mail${focused ? '' : '-outline'}` : 'md-mail';
            break;
          case 'Profile':
            iconName =
              Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
