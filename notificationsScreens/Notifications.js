import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';

// Colors, layout
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Layout from '../constants/Layout';

// Component imports
import NotificationsReceived from './NotificationsReceived';
import NotificationsSent from './NotificationsSent';

export default TabNavigator(
  { 
    NotificationsReceived: {
      screen: NotificationsReceived,
      navigationOptions: { title: 'Received' }
    },
    NotificationsSent: {
      screen: NotificationsSent,
      navigationOptions: { title: 'Sent' }
    },
  },
  {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: false,
    animationEnabled: true,
    // upperCaseLabel: false,


    // Options for TabBarTop
    tabBarOptions: {
      // activeTintColor: 'white',
      // inactiveTintColor: 'black',

      // Tab style
      style: {
        backgroundColor: Colors.backgroundColor,
        height: Layout.headerHeight,
      },

      // Text style for label
      labelStyle: {
        color: Colors.tintColor,
        fontFamily: Fonts.headerFont,
        fontSize: Fonts.headerFontSize,
        padding: 10,
      },

      // Style for line underneath tabs
      indicatorStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  }
);