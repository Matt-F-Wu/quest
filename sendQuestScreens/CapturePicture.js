import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
} from 'react-native';
import { FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';

// Constant imports
import Colors from '../constants/Colors';

// Component imports
import CameraBase from '../components/SendQuest/CameraBase';

var self;
export default class CapturePicture extends CameraBase {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'Take a Picture',
    headerLeft: (
      <Icon2 name={'chevron-left'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => navigation.goBack() } />
      ),
    headerRight: (
      <Icon name={'md-close-circle'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => self.backToMain() } />
      ),
  });

  constructor(props) {
      super(props);
      self = this;
  }

  backToMain(){
    self.setState({mountCam: false}); 
    self.props.navigation.popToTop();
  }

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      const { navigate } = this.props.navigation;
      console.debug(photo.uri);
      //unmount camera
      this.setState({mountCam: false});
      navigate('AddCaption', photo);
    }
  };

  customize(num){
    const styles = StyleSheet.create({
      button: {
        backgroundColor: Colors.tintColor,
        width: 80,
        height: 80,
        borderRadius: 40,
      },
    });
  	this.setState({has_button: true, buttonPress: () => this.takePicture(), styles: styles});
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    ).catch(e => {
      console.debug(e, 'Directory exists');
    });
  }

}

