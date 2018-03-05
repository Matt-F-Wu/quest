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
export default class SelectLocation extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Choose a Location',
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

  	this.state = {
  		markers: [
  			{latlng: {latitude: 37.4281015, longitude: -122.170622}, 
  				title: 'Favourite Location', image: require('../assets/images/favourite.png'),
  				onPress: () => {this.setState({ hideout: {latitude: 37.4281015, longitude: -122.170622}}); this.locationSelected()}},
  			{latlng: {latitude: 37.4228397, longitude: -122.162555}, 
  				title: 'Favourite Location', image: require('../assets/images/favourite.png'),
  				onPress: () => {this.setState({ hideout: {latitude: 37.4228397, longitude: -122.162555}}); this.locationSelected()}},
  		],
  		hideout: {latitude: 37.4223618, longitude: -122.1823528},
  	};
  }

  locationSelected(){
    const { navigate } = this.props.navigation;
  	if(this.state.hideout !== {}){
  		//location selected
  		Alert.alert("Hide at this location?", "",
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => {this.proceed(false)} },
        ]
      );
  	}else{
  		Alert.alert("Wait!", "Drag to desired location and click to select");
  	}
  }

  proceed(indoor){
    const { navigate } = this.props.navigation;
    navigate('CustomizeGame', {main_remount: this.props.navigation.state.params.main_remount, indoor: indoor, hideout: this.state.hideout});
  }

  proceedWrapper(){
    Alert.alert("Skipping this step will send an Indoor Quest!", "aka a game to play at home",
        [
          {text: 'Cancel', onPress: () => console.log('Not Skipping'), style: 'cancel'},
          {text: 'OK', onPress: () => {this.proceed(true)} },
        ]
      );
  }

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.4274745,
          longitude: -122.1719077,
          latitudeDelta: 0.0369,
          longitudeDelta: 0.0168,
        }}>
        {this.state.markers.map((marker, idx) => (
          <MapView.Marker key={idx}
            coordinate={marker.latlng}
            title={marker.title}
            image={marker.image}
            onPress={marker.onPress}
          />
        ))}

        <MapView.Marker draggable
          coordinate = {{latitude: 37.4223618, longitude: -122.1823528}}
          title={'Hide Your Quest'}
          onDragEnd={(e) => this.setState({ hideout: e.nativeEvent.coordinate })}
          onPress={() => this.locationSelected()}>
        </MapView.Marker>

        <MapView.Marker
          coordinate = {{latitude: 37.4268463, longitude: -122.1658255}}
          title={' is here!'}>
          <Image
            source={this.props.navigation.state.params.user_image}
            resizeMode='cover'
            style={{width: 80, height: 80, borderRadius: 40}}
          />
        </MapView.Marker>

      </MapView>
      <RkButton onPress={() => this.proceedWrapper()} 
          style={[{position: 'absolute', left: '15%', top: '90%', width: '20%', height: '8%', marginBottom: '2%',}, styles.button]} >
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Skip</Text>
      </RkButton>
      <RkButton onPress={() => this.proceed()} 
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