import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
} from 'react-native';
import { FileSystem } from 'expo';
import Colors from '../constants/Colors';
import CameraBase from '../components/CameraBase';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CapturePicture extends CameraBase {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'Take a Picture',
    headerTintColor: Colors.tintColor,
    headerRight: (
      <Icon name={'md-close-circle'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => { navigation.navigate('Compose') }} />
      ),
  });

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      const { navigate } = this.props.navigation;
      console.debug(photo.uri);
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

