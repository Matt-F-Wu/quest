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
            <Text style={tl_styles.title}>Lily Wang</Text>
            <Text style={tl_styles.title}>Toronto, ON, Canada</Text>
            <Text style={tl_styles.special}>Your Favourite Location with Lily:</Text>
            <Text style={tl_styles.title}>St.Michaels Hall, University of Toronto, ON, Canada</Text>
            <Icon name={'ios-create'} size={30} style={{color: Colors.tintColor,}} />
        </View>
      );
  }

}

const tl_styles = StyleSheet.create({
  title: {
    padding: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666',
  },
  special: {
    padding: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.tintColor,
  },
});