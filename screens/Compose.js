import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import ContactList from '../components/ContactList.js';
import { Alert } from 'react-native';
import Colors from '../constants/Colors';

//flags used to denote which step we are at during the sending process
const STEP_FLAG = {contact: 0, pin: 1, format: 2, compose: 3, send: 4};

export default class Compose extends React.Component {
  static navigationOptions = {
    title: 'Send a Quest',
    headerTintColor: Colors.tintColor,
  };

  //Call constructor to store state information
  constructor(){
  		super();
    	this.state = {currentStep: STEP_FLAG.contact};
    } 

  toMap(item){
      const { navigate } = this.props.navigation;
      navigate('SelectLocation', item);
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
