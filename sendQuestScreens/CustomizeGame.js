import React from 'react';
import {
  View,
  Image,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import { MapView } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {RkButton} from 'react-native-ui-kitten';

// Constant imports
import Colors from '../constants/Colors';

const username = 'HaoWu';
const PUSH_ENDPOINT = 'https://quest-back-end.herokuapp.com/sendq/';

var pinLoc = {latitude: 37.4223618, longitude: -122.1823528};
var self;
export default class CustomizeGame extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Design the Game',
    headerLeft: (
      <Icon2 name={'chevron-left'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => navigation.goBack() } />
      ),
    headerRight: (
      <Icon name={'md-close-circle'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => {navigation.popToTop(); navigation.state.params.main_remount({ mountCam: true });} } />
      ),
  });


  constructor(props) {
    super(props);
    self = this;
  }

  sendQuest(indoor){
    fetch(PUSH_ENDPOINT + username, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          value: 'Some data',
          indoor: indoor,
        },
      }),
    });
    const { navigate } = this.props.navigation;
    Alert.alert("Quest sent successfully!");

    self.props.navigation.popToTop();
    self.props.navigation.state.params.main_remount({ mountCam: true });
  }

  sendQuestWrapper(){
    Alert.alert("Skipping this step will send an Indoor Quest!", "aka a game to play at home",
        [
          {text: 'Cancel', onPress: () => console.log('Not Skipping'), style: 'cancel'},
          {text: 'OK', onPress: () => {this.sendQuest(true)} },
        ]
      );
  }

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
      <RkButton onPress={() => this.sendQuestWrapper()} 
          style={[{position: 'absolute', left: '15%', top: '90%', width: '20%', height: '8%', marginBottom: '2%',}, styles.button]} >
          <Text>Skip</Text>
      </RkButton>
      <RkButton onPress={() => this.sendQuest(false)} 
          style={[{position: 'absolute', left: '65%', top: '90%', width: '20%', height: '8%', marginBottom: '2%',}, styles.button]} >
          <FIcon name={'check'} color='#ffffff' size={30} />
      </RkButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.tintColor,
    borderRadius: 40,
  },
});