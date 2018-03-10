import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';

// Colors, layout
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Layout from '../constants/Layout';

// Component imports
import ReceivedTab from '../components/Gallery/GalleryReceivedTab';
import SentTab from '../components/Gallery/GallerySentTab';

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