import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Alert } from 'react-native';

// Constant imports
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Entypo';

// Component imports
import ContactList from '../components/SendQuest/ContactList.js';

//flags used to denote which step we are at during the sending process
const STEP_FLAG = {contact: 0, pin: 1, format: 2, compose: 3, send: 4};

export default class Compose extends ContactList {

  static navigationOptions  = ({ navigation, screenProps }) => ({
    title: 'Send a Quest',
    headerStyle: {backgroundColor:Colors.backgroundColor, borderColor:'transparent'},
    headerLeft: (
      <Icon name={'chevron-left'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => {navigation.goBack(); navigation.state.params.remount({ mountCam: true });}} />
      ),
  });

  toMap(item){
      const { navigate } = this.props.navigation;
      //Passing main_remount down the stack
      item.main_remount = this.props.navigation.state.params.main_remount;
      navigate('CapturePicture', item);
  };

}


