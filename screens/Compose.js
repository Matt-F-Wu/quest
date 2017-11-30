import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import ContactList from '../components/ContactList.js';

//flags used to denote which step we are at during the sending process
const STEP_FLAG = {contact: 0, pin: 1, format: 2, compose: 3, send: 4};

export default class Compose extends React.Component {
  static navigationOptions = {
    title: 'Send a Quest',
  };

  //Call constructor to store state information
  constructor(){
  		super();
    	this.state = {currentStep: STEP_FLAG.contact};
    } 


  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    if(this.state.currentStep === STEP_FLAG.contact){
    	return (
			/*Return a list of contacts here*/
			<ContactList />
		);
    }
    else if(this.state.currentStep === STEP_FLAG.pin){
    	return (
			//TODO, pin on map step
			<ContactList />
		);
    }
    else if(this.state.currentStep === STEP_FLAG.format){
    	return (
			//TODO, choose msg format, video, audio, etc
			<ContactList />
		);
    }
    else if(this.state.currentStep === STEP_FLAG.compose){
    	return (
			//TODO, make the msg
			<ContactList />
		);
    }
    else {
    	return (
			//TODO, send
			<ContactList />
		);
    }
	
  }
}
