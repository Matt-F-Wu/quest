import React from 'react';
import { TouchableOpacity, View, Image, WebView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon6 from 'react-native-vector-icons/EvilIcons'
import ProfileOverlay from '../components/SendQuest/ProfileOverlay';
import CameraBase from '../components/SendQuest/CameraBase';
import FavoritesView from '../components/SendQuest/FavoritesView';
import { BlurView } from 'expo';
import Colors from '../constants/Colors';

const profileIconSize = 45;

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
      var { navigate } = this.props.navigation;
      //Hao: the key is to pass functions bond to this screen as navigation parameters and call them from subsequent screens
      return [
          <BlurView key={'blur_overlay'} tint="dark" intensity={100} style={{position: 'absolute', height: '100%', width: '100%'}} />,
          <FavoritesView key={'favorites_view'} style={{position: 'absolute', height: '100%', width: '100%'}} 
                         transition={(i) => {console.debug("Called: " + i); this.setState({mountCam: false}); navigate('Compose', {remount: this.remount, main_remount: this.remount, info: i})}} />,
          <ProfileOverlay key={'p_overlay'} ref={(ref) => this.profile = ref} toProfile={() => navigate('ContactList')}/>,
          <TouchableOpacity style={{position: 'absolute', marginTop: 15, marginLeft: 5, width: 45, height: 50, backgroundColor: 'transparent'}} key={'p_button'}>
              <Icon6 name="user" size={profileIconSize} color={Colors.tintColor} onPress={() => this.profile.toggleModal()} />
          </TouchableOpacity>,
      ];
    }
}