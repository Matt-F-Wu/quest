import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

// Colors, Fonts
import Colors from '../../constants/Colors';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';

// TODO
// Navigation is messing up camera again...

const sendButtonSize = 70;
const favSize = 80;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const radius = Dimensions.get('window').width / 3;


data = [ 
	{
    	name: 'Lily', 
	    image: require('../../assets/images/profileImages/woman4.png'),
  	},
  	{
	    name: 'Austin',
	    image: require('../../assets/images/profileImages/man8.png'),
  	},
  	{
	    name: 'Nicole', 
	    image: require('../../assets/images/profileImages/woman7.png'),
  	},
  	{
	    name: 'Samantha', 
	    image: require('../../assets/images/profileImages/woman6.png'),
  	},
  	{
    	name: 'Jon', 
    	image: require('../../assets/images/profileImages/man7.png'),
  	},
    {
	    name: 'Grace', 
	    image: require('../../assets/images/profileImages/woman1.png'),
  	},
];


/*
 * Returns a view that has a center button surrounded by the favorites equally spaced on a circular boundary
 */
makeFavoritesView = (navigation, remount, main_remount) => {
	var favorites = [];

	let n = data.length;						// Number of favorites to render
	let theta = 360 / n * Math.PI / 180;		// Angle between each favorite circle

	let sendButtonX = screenWidth / 2;
	let sendButtonY = screenHeight / 2;

	let sendButtonLeft = sendButtonX - (sendButtonSize / 2);
	let sendButtonTop = sendButtonY - (sendButtonSize / 2);

	// Render send Quest button
	favorites.push(
		<TouchableOpacity style={[styles.sendButtonContainerStyle, {top: sendButtonTop, left: sendButtonLeft}]}>
			<Icon name="send-o" size={sendButtonSize} color={Colors.tintColor} 
			      onPress={() => navigation.navigate('Compose', {remount: remount, main_remount: main_remount})}/>
		</TouchableOpacity>
	)


	// Cartesian coordinates of first favorite (center of screen is origin)
	var x1 = -radius / Math.sqrt(2);
	var y1 = radius / Math.sqrt(2);

	// Render favorites in a circle around center
	for (let i = 0; i < n; i++) {

		// Cartesian coordinates of next favorite (center of screen is origin)
		let x2 = (x1 * Math.cos(theta)) + (y1 * Math.sin(theta));
		let y2 = -(x1 * Math.sin(theta)) + (y1 * Math.cos(theta));

		// Screen coordinates of next favorite
		let currTop  = sendButtonY - y2 - (favSize / 2);
		let currLeft = sendButtonX + x2 - (favSize / 2);

		// Render next favorite
		favorites.push(
			<TouchableOpacity style={[styles.circleContainer, {top: currTop, left: currLeft}]}
							  onPress={() => navigation.navigate('CapturePicture', {remount: remount, main_remount: main_remount})}>
	 			<Image resizeMode='cover' 
	   	   			   source={data[i].image}
		       		   style={[styles.profileImg]} />
			</TouchableOpacity>
		)
		// Update coordinates
		x1 = x2;
		y1 = y2;
	}
	return favorites
}


export default class FavoritesView extends React.Component {

	render() {
		var remount = this.props.remount;
		var main_remount = this.props.main_remount;
		let favorites = makeFavoritesView(this.props.navigation, remount, main_remount);

		return (
			<View style={{width:'100%', height:'100%', justifyContent: 'center', alignItems: 'center'}}>
				{favorites}
			</View>
		);
	}
}


const styles = StyleSheet.create({
	favoritesContainer: {
		height: '100%', 
		width: '100%',
	},

	sendButtonContainerStyle: {
		backgroundColor: 'transparent',
		position: 'absolute',
	},

	circleContainer: {
		position: 'absolute',
		width: favSize,
		height: favSize,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: favSize / 2,
		borderColor: Colors.tintColor,
		borderWidth: 2,
	},

	profileImg: {
		width: favSize - 10,
		height: favSize - 10,
		borderRadius: (favSize - 10) / 2,
		backgroundColor: 'transparent',
	},
});
