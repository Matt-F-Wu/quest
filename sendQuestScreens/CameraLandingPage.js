import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import ProfileOverlay from '../components/SendQuest/ProfileOverlay';
import CameraBase from '../components/SendQuest/CameraBase';
import Colors from '../constants/Colors';

class CameraLanding extends CameraBase {

  	constructor(props) {
      super(props);
  	}

  	customize(num){
  		this.setState({has_refresh: false, 
  					   has_label: true, textLabel:'quest'});
  	}
}

export default class CameraLandingPage extends React.Component {
  static navigationOptions = {
      header: null,
  };
    
  render(){

    const { navigate } = this.props.navigation;

    return (
      <CameraLanding>
        <ProfileOverlay/> 
        <TouchableOpacity style={{alignSelf:'center', backgroundColor:'transparent'}} onPress={() => {navigate('Compose')}}>
          <Icon2 name="target" size={250} color={Colors.tintColor} />
        </TouchableOpacity> 
      </CameraLanding>
      );

  }

}