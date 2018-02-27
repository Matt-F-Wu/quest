import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Animated, Text } from 'react-native';
import { AppLoading, Asset, Font, Permissions, Notifications } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Colors from './constants/Colors';
import Touchables from './components/Touchables';
import SwiperNavigation from './navigation/SwiperNavigation';


const PUSH_ENDPOINT = 'https://quest-back-end.herokuapp.com/register';
var isShown = false;
const notification_h = 100;
var mounted = false;
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    receivedNotification: null,
    lastNotificationId: null,
    bounceValue: new Animated.Value(-100),
  };

  _showNotification = () => {
    var toValue = 0;

    if(isShown) {
      toValue = -100;
    }

    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
      }
    ).start();

    isShown = !isShown;
  }
  
  componentWillMount() {
    console.debug("Main frame mount!");

    mounted = true;

    this.registerForPushNotificationsAsync();
    
    this._notificationSubscription = Notifications.addListener((receivedNotification) => {
      this.setState({
        receivedNotification,
        lastNotificationId: receivedNotification.notificationId,
      });
      //TODO: Notification received, do something
      this._showNotification();
      //Auto collapsing the notification after 2 seconds
      setTimeout(() => {
        if(mounted && isShown){
          this._showNotification();
        }
      }, 3000);
    });
  }

  componentWillUnmount(){
    mounted = false;
  }
  
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    console.debug("Getting token...");
    let token = await Notifications.getExpoPushTokenAsync();
    console.debug("Push token: " + token);

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        user: {
          username: 'HaoWu',
        },
      }),
    });
  };

  render() {
    console.debug("Rendering main frame");
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          <SwiperNavigation />
          <Animated.View
            style={[styles.subView,
              {transform: [{translateY: this.state.bounceValue}]}]}>
            <Touchables 
              onClick={this._showNotification}
              hasImage={true} 
              title={'Notification!'} subTitle={'Someone just sent you a new Quest!'}
              text={'Click to embark on your journey'} styles={styles} 
              image={require('./assets/images/icon.png')}/>
          </Animated.View>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  subView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: Colors.tintColor,
    height: notification_h,
    borderRadius: 10,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    margin: '1%',
  },
  cardStyle: {
    flexDirection: 'column',
    marginLeft: "1%",
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  subTitle: {
    color: 'white',
  },
  text: {
    color: 'white',
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  contactImg: {
    width: 80,
    height: 80,
  },
});
