import React, { Component } from 'react';
import { Stylesheet, View, TouchableOpacity } from 'react-native';

// Icon imports
// import { Ionicons } from '@expo/vector-icons';
import Icon1 from 'react-native-vector-icons/Ionicons';
// import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';

// Color import
import Colors from '../constants/Colors';

// Component imports
import ProfileOverlay from '../components/SendQuest/ProfileOverlay';

export default class LandingPage extends Component {

  static navigationOptions = {
    // title: 'Send a Quest',
    // headerTintColor: Colors.tintColor,
    header: null,
  };

  render() {

    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>

          <ProfileOverlay/>


          <TouchableOpacity style={styles.questIcon}>
            <Icon3 name="target" size={300} color={Colors.tintColor} onPress={() => navigate('Compose')} />
          </TouchableOpacity>
 
          <View style={styles.footer}>
          
            <TouchableOpacity style={styles.notificationsIcon}>
              <Icon1 name="ios-chatboxes-outline" size={50} color={Colors.tintColor} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.galleryIcon}>
              <Icon1 name="ios-apps-outline" size={50} color={Colors.tintColor} />
            </TouchableOpacity>

          </View>

        </View>
    );
  }
}


const styles = {

  // LANDING PAGE STYLES

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
  },

  innerContainer: {
    height: '100%',
    alignItems: 'center',
    marginHorizontal: 100,
    marginBottom: 50,
  },

  notificationsIcon: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  
  galleryIcon: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 25,
  },
  
  questIcon: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 100,
  },

  footer: {
    flex: 1,
    flexDirection: 'row',
  },

};











