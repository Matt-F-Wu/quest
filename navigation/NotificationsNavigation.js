import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

// Colors
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Component imports
import NotificationsLandingPage from '../notificationsScreens/Notifications';
import CameraNav from '../notificationsScreens/CameraNav';
import ViewQuest from '../notificationsScreens/ViewQuest';


const NotificationsStackNavigator = StackNavigator(
  {
    Main: {
      screen: NotificationsLandingPage,
    },
    CameraNav: {
      screen: CameraNav,
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
        fontWeight: 'normal',
        fontSize: Fonts.headerFontSize,
        color: Colors.tintColor,
      },
    }),
  }
);

export default class NotificationsNavigator extends React.Component {

  render() {
    return <NotificationsStackNavigator />;
  }
  
}

