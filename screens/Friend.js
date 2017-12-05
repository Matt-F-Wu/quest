import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import Colors from '../constants/Colors';
import CameraBase from '../components/CameraBase';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Friend extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Lily Wang',
    headerRight: (
      <Icon name={'md-close-circle'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => { navigation.navigate('Compose') }} />
      ),
    headerTintColor: Colors.tintColor,
  });

  render(){
    return (
        <View style={{padding: 20, backgroundColor: 'white'}}>
            <Text>Lily Wang</Text>
            <Text>Toronto, ON, Canada</Text>
        </View>
      );
  }

}
