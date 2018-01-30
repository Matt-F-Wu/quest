import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import ContactList from '../components/ContactList.js';
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
//flags used to denote which step we are at during the sending process
const STEP_FLAG = {contact: 0, pin: 1, format: 2, compose: 3, send: 4};
const PUSH_ENDPOINT = 'https://quest-back-end.herokuapp.com/sendq/';

//This should be determined after user login/registration
const username = 'HaoWu';
export default class AddCaption extends React.Component {
  state = {
    captionText: '',
  };

  static navigationOptions = {
    title: 'Add a Caption',
    headerTintColor: Colors.tintColor,
  };

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
    const { navigate } = this.props.navigation;
    Alert.alert("Quest sent successfully!");
    navigate('Compose');
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    var img_src = this.props.navigation.state.params.uri;
    //this.aboutFile(img_src);
    //console.debug(img_src);
  	return (
  		/*Return a list of contacts here*/
  		<View style={{ flex: 1, backgroundColor: Colors.tintColor }}>
        <Image resizeMode='cover'
          source={{uri: img_src}}
          style={{ width: '100%', height: '100%' }}
        />
        <RkButton onPress={() => this.sendQuest()} 
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
