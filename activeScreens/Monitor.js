import React from 'react';
import Expo, { Asset, Location, Permissions, MapView } from 'expo';
import { View, Dimensions, StyleSheet, Text, Image, Alert, TextInput} from 'react-native';
import Colors from '../constants/Colors';
import {RkButton} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Entypo';
var secret = require('../api/secret');
var routeDecoder = require('../api/routeDecoder');

export default class Monitor extends React.Component {
	static navigationOptions  = ({ navigation, screenProps }) => ({
	    title: 'Monitor Quest',
	    style:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
	    headerLeft: (
	      <Icon name={'chevron-left'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
	                            onPress={ () => {navigation.goBack();} } />
	      ),
  	});

	state={
		cur_location: null,
		coords: [],
		got_route: false,
	}

	constructor(props) {
    	super(props);
    	const mode = 'walking';
    	let location = this.props.navigation.state.params.cur_location;
    	let hideout = this.props.navigation.state.params.hideout;
    	const origin = location.coords.latitude + ',' + location.coords.longitude;
    	const destination = hideout.latitude + ',' + hideout.longitude;
		const APIKEY = secret.GMapAPIKey;
		const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

		fetch(url)
		.then(response => response.json())
		.then(responseJson => {
		  console.debug("Response Received!");
		  if (responseJson.routes.length) {
		      const c_arr = routeDecoder.decode(responseJson.routes[0].overview_polyline.points);
		      //add origin to the head
		      c_arr.unshift({latitude: location.coords.latitude, longitude: location.coords.longitude});
		      //push destination to the tail
		      //c_arr.push({latitude: 37.4274821, longitude: -122.1702636}); // definition below
		      this.setState({
				cur_location: location,
		        coords: c_arr,
		        got_route: true,
		      });
		  }
		}).catch(e => {console.warn(e)});
    }

	render(){
		return (
			<View style={{flex: 1}}>
				{this.state.got_route? (
					<MapView
		            style={{ flex: 1 }}
		            initialRegion={{
		              latitude: this.state.cur_location.coords.latitude,
		              longitude: this.state.cur_location.coords.longitude,
		              latitudeDelta: 0.0369,
		              longitudeDelta: 0.0168,
		            }}>

		            <MapView.Marker
		              coordinate = {{
		                latitude: this.state.cur_location.coords.latitude, 
		                longitude: this.state.cur_location.coords.longitude}}
		              title={'You are here!'}
		              pinColor={Colors.tintColor}>
		            </MapView.Marker>

		            <MapView.Polyline 
		              coordinates={this.state.coords}
		              strokeWidth={4}
		              strokeColor={Colors.tintColor}/>

		          </MapView>) : (
		          <View style={{flex: 1, backgroundColor: Colors.backgroundColor, alignItems: 'center', justifyContent: 'center'}}>
		          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Loading experience...</Text>
		          </View>)}
		          {this.props.navigation.state.params.requestText? (
					<View style={{position: 'absolute', width: '80%', backgroundColor: Colors.textBGBlur, alignSelf: 'center', marginTop: '10%', padding: 15}}>
						<Text style={styles.titleText}>{this.props.navigation.state.params.requestText}</Text>
						<TextInput
							style={styles.inputText}
							onChangeText={(text) => this.setState({hintText: text})}
							value={this.state.hintText}
							placeholder={'Drop a hint here...'}
							placeholderTextColor={Colors.accentColor}
						/>
						<RkButton style={{padding: 15, backgroundColor: Colors.tintColor, borderRadius: 5, marginBottom: 15, alignSelf: 'center'}}
						  onPress={() => {showDash = false;}}>
							<Text style={{fontSize: 16, color: Colors.noticeText}}>Send</Text>
						</RkButton>
					</View>
		          	) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
  titleText: {
    color: Colors.tintColor,
    fontWeight: 'bold',  
    fontSize: 16,
    margin: 10,
  },
  inputText: {
    color: Colors.tintColor,
    fontWeight: 'bold',  
    fontSize: 18,
    margin: 20,
    borderBottomColor: Colors.tintColor,
    borderBottomWidth: 2,
  },
});