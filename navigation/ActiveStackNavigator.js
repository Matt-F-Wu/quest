import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

// Colors
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Component imports
import ActiveLandingPage from '../activeScreens/ActiveTabNavigator';
import Monitor from '../activeScreens/Monitor';
import CameraNav from '../activeScreens/CameraNav';
import ViewQuest from '../activeScreens/ViewQuest';


const ActiveStackNavigator = StackNavigator(
  {
    Main: {
      screen: ActiveLandingPage,
    },
    CameraNav: {
      screen: CameraNav,
    },
    Monitor: {
      screen: Monitor,
    },
    ViewQuest: {
      screen: ViewQuest,
    },
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: Colors.backgroundColor,
      },
      headerBackStyle: {
        color: Colors.tintColor,
      },
      headerTitleStyle: {
        fontFamily: Fonts.headerFont,
        fontSize: Fonts.headerFontSize,
        color: Colors.tintColor,
      },
    }),
  }
);

export default class ActiveNavigator extends React.Component {

  render() {
    return <ActiveStackNavigator />;
  }
  
}

