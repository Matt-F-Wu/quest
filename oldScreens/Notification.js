import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';

import ReceivedTab from '../components/ReceivedTab';
import SentTab from '../components/SentTab';



export default TabNavigator(
  { 
    ReceivedTab: {
      screen: ReceivedTab,
    },
    SentTab: {
      screen: SentTab,
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
        backgroundColor: 'white',
      },

      // Text style for label
      labelStyle: {
        color: 'orange',
        fontSize: 20,
        padding: 10,
      },

      // Style for line underneath tabs
      indicatorStyle: {
        backgroundColor: 'orange',
      },
    }
  }
);