import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import CameraNav from '../screens/CameraNav';
import Friend from '../screens/Friend';
import ViewQuest from '../screens/ViewQuest';
import SelectLocation from '../screens/SelectLocation';
import AddCaption from '../screens/AddCaption';
import CapturePicture from '../screens/CapturePicture';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    CameraNav: {
      screen: CameraNav,
    },
    Friend: {
      screen: Friend,
    },
    ViewQuest: {
      screen: ViewQuest,
    },
    SelectLocation: {
      screen: SelectLocation,
    },
    CapturePicture: {
      screen: CapturePicture,
    },
    AddCaption: {
      screen: AddCaption,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  
  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    //registerForPushNotificationsAsync();

    // Watch for incoming notifications
    //this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
  
}

