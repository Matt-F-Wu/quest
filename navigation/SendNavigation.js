import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

// Colors
import Colors from '../constants/Colors';

// Component imports
import SelectLocation from '../sendQuestScreens/SelectLocation';
import AddCaption from '../sendQuestScreens/AddCaption';
import CapturePicture from '../sendQuestScreens/CapturePicture';
import Compose from '../sendQuestScreens/Compose';
import CameraLandingPage from '../sendQuestScreens/CameraLandingPage';

const SendStackNavigator = StackNavigator(
  {
    Main: {
      screen: CameraLandingPage,
    },
    Compose: {
      screen: Compose,
    },
    CapturePicture: {
      screen: CapturePicture,
    },
    AddCaption: {
      screen: AddCaption,
    },
    SelectLocation: {
      screen: SelectLocation,
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
        color: Colors.tintColor,
      },
    }),
  }
);

export default class SendNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <SendStackNavigator />;
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

