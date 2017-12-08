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
var self;
export default class CameraNav extends CameraBase {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'Navigate',
    headerTintColor: Colors.tintColor,
    headerLeft: (
      <Icon name={'md-close-circle'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => self.backToMain() } />
      ),
  });

  constructor(props) {
      super(props);
      self = this;
  }

  backToMain(){
    const { navigate } = self.props.navigation;
    self.setState({mountCam: false});
    navigate('Profile');
  }

  num_objs = 4;

  customize(num) {
    var i;
    var objectArray = [];
    for(i = 0; i < num; i++){
      objectArray.push({
        x: (80-i*10) + '%',
        y: (60-i*5) + '%',
        w: (120-15*i),
        h: (120-15*i),
        image: require('../assets/images/coin.gif'),
      });
    }

    objectArray.push({
      x: (80-num*10) + '%',
      y: (60-num*5) + '%',
      w: 100,
      h: 100,
      image: require('../assets/images/star.gif'),
    });
    //This view does not have coins/objects
    this.setState({has_button: false, has_objects: true, 
      objects: objectArray, styles: styles, has_lable: true,
      lx: 10, ly: 10, 
      textLable: 'Coins count: ' + (100 + (4-num)) + ', 150 meters utill destination'});
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
        w: 120,
        h: 120,
        image: require('../assets/images/deceiver.png'),
      });
    }
    const { navigate } = this.props.navigation;
    objectArray.push({
      x: (Math.random()*88) + '%',
      y: (Math.random()*88) + '%',
      w: 120,
      h: 120,
      image: require('../assets/images/goal.png'),
      onClick: () => {this.num_objs = 4; this.setState({mountCam: false}); navigate('ViewQuest');},
    })
    //This view does not have coins/objects
    this.setState({has_button: false, has_objects: true, 
      objects: objectArray, styles: styles, has_lable: true,
      textLable: 'Coins count: 104, at destination\nFind the odd ones out!'});
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
    padding: 5,
    borderRadius: 4,
    backgroundColor: Colors.blurOrange,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactImg: {
    width: '90%',
    height: '90%',
  },
});