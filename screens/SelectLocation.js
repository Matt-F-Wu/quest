import React from 'react';
import {
  View,
  Image,
  Text,
  Alert,
} from 'react-native';
import { MapView } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

export default class SelectLocation extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Hide it around: ' + `${navigation.state.params.name}`,
    headerRight: (
      <Icon name={'md-close-circle'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => { navigation.navigate('Compose') }} />
      ),
    headerTintColor: Colors.tintColor,
  });

  constructor(props) {
  	super(props);

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
          {text: 'OK', onPress: () => navigate('CapturePicture')},
        ]
      );
  	}else{
  		Alert.alert("Wait!", "Darg to desired location and click to select");
  	}
  }

  render() {
    return (
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
          image={require('../assets/images/pin.png')}
          onDragEnd={(e) => this.setState({ hideout: e.nativeEvent.coordinate })}
          onPress={() => this.locationSelected()}>
        </MapView.Marker>
        <MapView.Marker
          coordinate = {{latitude: 37.4268463, longitude: -122.1658255}}
          title={this.props.navigation.state.params.name + ' is here!'}
          image={require('../assets/images/person.png')}>
        </MapView.Marker>
      </MapView>
    );
  }
}