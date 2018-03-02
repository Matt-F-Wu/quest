import React from 'react';
import { TouchableOpacity, View, Image, WebView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileOverlay from '../components/SendQuest/ProfileOverlay';
import CameraBase from '../components/SendQuest/CameraBase';
import FavoritesView from '../components/SendQuest/FavoritesView';
import { BlurView } from 'expo';
import Colors from '../constants/Colors';

export default class CameraLandingPage extends CameraBase {
    static navigationOptions = {
      header: null,
    };

  	constructor(props) {
      super(props);
  	}

  	customize(num){
  		this.setState({has_refresh: false, 
  					   has_label: true, textLabel:'Quest'});
      //console.debug("states: " + this.state.has_label + " " + this.state.has_refresh );
  	}

    debugPrint(){
      //console.debug("states: " + this.state.has_label + " " + this.state.has_refresh ); 
    }

    makeChildren(){
      const { navigate } = this.props.navigation;
      //Hao: the key is to pass functions bond to this screen as navigation parameters and call them from subsequent screens
      return [
          <BlurView tint="dark" intensity={100} style={{position: 'absolute', height: '100%', width: '100%'}} />,
          <FavoritesView navigation={navigate} key={'favorites_view'} style={{position: 'absolute', height: '100%', width: '100%'}}/>,
          <ProfileOverlay key={'p_overlay'}/>,
      ];
    }
}



 // onPress={() => {this.setState({mountCam: false}); navigate('Compose', {remount: this.remount, main_remount: this.remount}