import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Constant imports
import Colors from '../constants/Colors';

// Component imports
import CameraBase from '../components/SendQuest/CameraBase';
import ProfileOverlay from '../components/SendQuest/ProfileOverlay';





export default class CameraLandingPage extends CameraBase {

	static navigationOptions = {
    	header: null,
  	};

  	constructor(props) {
      super(props);
      self = this;
  	}

  	customize(num){
  		this.setState({has_overlay: true, has_refresh: false, 
  					   has_label: true, textLabel:'quest', has_target: true});
  	}
}