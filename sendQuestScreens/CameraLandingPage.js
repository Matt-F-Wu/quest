import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import ProfileOverlay from '../components/SendQuest/ProfileOverlay';
import CameraBase from '../components/SendQuest/CameraBase';
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
  					   has_label: true, textLabel:'quest'});
      //console.debug("states: " + this.state.has_label + " " + this.state.has_refresh );
  	}

    debugPrint(){
      //console.debug("states: " + this.state.has_label + " " + this.state.has_refresh ); 
    }

    makeChildren(){
      const { navigate } = this.props.navigation;
      //Hao: the key is to pass functions bond to this screen as navigation parameters and call them from subsequent screens
      return [
          <View key={'black_mask'} style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: Colors.blackMask}}></View>,
          <Image key={'treasure_map'} style={{position: 'absolute', width: '80%', left: '10%', alignSelf:'center'}} resizeMode='contain' source={require('../assets/images/treasureMap.gif')} />, 
          <ProfileOverlay key={'p_overlay'}/>,
          <TouchableOpacity key={'main_send_button'} style={{alignSelf:'center', backgroundColor:'transparent'}} 
            onPress={() => {this.setState({mountCam: false}); navigate('Compose', {remount: this.remount, main_remount: this.remount})}}>
            <Icon2 name="target" size={250} color={Colors.tintColor}/>
          </TouchableOpacity>
      ];
    }
}