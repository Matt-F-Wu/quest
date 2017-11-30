import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
} from 'react-native';

import Colors from '../constants/Colors';
import CameraBase from '../components/CameraBase';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CameraCompose extends CameraBase {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'Navigate',
    headerLeft: (
      <Icon name={'md-close-circle'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => { navigation.navigate('Profile') }} />
      ),
  });

  num_objs = 4;

  customize(num) {
    var i;
    var objectArray = [];
    for(i = 0; i < num; i++){
      objectArray.push({
        x: (40+i*5) + '%',
        y: (70-i*10) + '%',
        w: (12-2*i) + '%',
        h: (12-2*i) + '%',
        image: require('../assets/images/coin.png'),
      });
    }
    //This view does not have coins/objects
    this.setState({has_button: false, has_objects: true, 
      objects: objectArray, styles: styles, has_lable: true,
      lx: 10, ly: 10, 
      textLable: 'Coins count: ' + (100 + (4-num)) + ', 150 meters till destination'});
  }

  arrived() {
    Alert.alert("You have arrived at your destination! Point your camera to the sky!");
    var i;
    var objectArray = [];
    var num_deceiver = 9;
    for(i = 0; i < num_deceiver; i++){
      objectArray.push({
        x: (Math.random()*88) + '%',
        y: (Math.random()*88) + '%',
        w: '12%',
        h: '12%',
        image: require('../assets/images/deceiver.png'),
      });
    }
    const { navigate } = this.props.navigation;
    objectArray.push({
      x: (Math.random()*88) + '%',
      y: (Math.random()*88) + '%',
      w: '12%',
      h: '12%',
      image: require('../assets/images/goal.png'),
      onClick: () => {num_objs = 4; navigate('ViewQuest');},
    })
    //This view does not have coins/objects
    this.setState({has_button: false, has_objects: true, 
      objects: objectArray, styles: styles, 
      textLable: 'Coins count: 104, at destination'});
  }

}

const styles = StyleSheet.create({
  rowStyle: {
    width: '100%',
    height: '100%',
  },
  cardStyle: {
    height: 0,
  },
  title: {
    height: 0,
  },
  subTitle: {
    height: 0,
  },
  text: {
    height: 0,
  },
  lable: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    backgroundColor: Colors.tintColor,
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.blurText,
    borderStyle: 'dotted',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.tintColor,
  },
  buttonIconInner: {
    color: 'white',
    fontSize: 32,
    width: 25,
    height: 35
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  contactImg: {
    width: '100%',
    height: '100%',
  },
});