import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import Colors from '../constants/Colors';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import { FileSystem } from 'expo';
import {RkButton} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

//flags used to denote which step we are at during the sending process
const STEP_FLAG = {contact: 0, pin: 1, format: 2, compose: 3, send: 4};

export default class AddCaption extends React.Component {
  state = {
    captionText: '',
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Add a Caption',
    headerLeft: (
      <Icon2 name={'chevron-left'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => {navigation.goBack(); navigation.state.params.remount({ mountCam: true });}} />
      ),
    headerRight: (
      <Ionicons name={'md-close-circle'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => {navigation.popToTop(); navigation.state.params.main_remount({ mountCam: true });} } />
      ),
  });

  async aboutFile(img_src){
    let info = await FileSystem.getInfoAsync(img_src);
    console.debug(info);
  }

  sendQuest(){
    fetch(PUSH_ENDPOINT + username, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          value: 'Some data',
        },
      }),
    });
    
    Alert.alert("Quest sent successfully!");
    /*TODO: Ian
      clear stacks

      Progress (Hao): Resolved by using popToTop() to solve this, provided by react-navigation@1.0.0-beta.31
    */
    this.props.navigation.popToTop();
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    var img_src = this.props.navigation.state.params.photo.uri;
    //this.aboutFile(img_src);
    //console.debug(img_src);
    const { navigate } = this.props.navigation;
  	return (
  		/*Return a list of contacts here*/
  		<View style={{ flex: 1, backgroundColor: Colors.tintColor }}>
        <Image resizeMode='cover'
          source={{uri: img_src}}
          style={{ width: '100%', height: '100%' }}
        />
        <RkButton onPress={() => navigate('SelectLocation', {main_remount: this.props.navigation.state.params.main_remount})} 
          style={{position: 'absolute', left: '40%', top: '90%', 
                  width: '20%', height: '8%', marginBottom: '2%', 
                  backgroundColor: Colors.tintColor}} >
          <Icon name={'check'} color='#fff' size={30} />
        </RkButton>
        <TextInput
          style={{height: 40, width: '90%', marginLeft: '5%', 
                  position: 'absolute', top: '10%', fontSize: 16,
                  backgroundColor: Colors.textBGBlur, color: 'white'}}
          onChangeText={(text) => this.setState({captionText: text})}
          value={this.state.captionText}
          placeholder={'Add caption...'}
          placeholderTextColor={'white'}
        />
      </View>
		);
	
  }
}
