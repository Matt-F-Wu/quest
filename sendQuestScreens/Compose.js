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

export default class Compose extends React.Component {


  static navigationOptions = {
    // const { navigate } = this.props.navigation;
    title: 'Send a Quest',
    headerBackgroundColor: Colors.BackgroundColor,
    headerTintColor: Colors.TintColor,
    // headerLeft: (
    //   <Icon name={'chevron-left'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
    //                         onPress={ () => self.goBack() } />
    //   ),

  };



  //Call constructor to store state information
  constructor(){
  		super();
    	this.state = {currentStep: STEP_FLAG.contact};
    } 

  toMap(item){
      const { navigate } = this.props.navigation;
      navigate('CapturePicture', item);
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    const { navigate } = this.props.navigation;
  	return (
  		/*Return a list of contacts here*/
  		<ContactList toMap={this.toMap.bind(this)} navigatorVal={navigate}/>
		);
	
  }
}