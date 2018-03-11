import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

// Colors, Fonts
import Colors from '../../constants/Colors';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome';
const sendButtonSize = 70;

import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

// TODO
// Navigation is messing up camera again...

// const sendButtonSize = 100;
// <Icon3 name="cube-send" size={sendButtonSize} color={Colors.tintColor} />

const favSize = 80;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const radius = Dimensions.get('window').width / 3;

data = [ 
	{
    	name: 'IanJones', 
	    image: require('../../assets/images/profileImages/ian.jpg'),
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
	    name: 'James', 
	    image: require('../../assets/images/profileImages/landay.jpg'),
  	},
];


/*
 * Returns a view that has a center button surrounded by the favorites equally spaced on a circular boundary
 */
makeFavoritesView = (self) => {
	var favorites = [];

	let n = data.length;						// Number of favorites to render
	let theta = 360 / n * Math.PI / 180;		// Angle between each favorite circle

	let sendButtonX = screenWidth / 2;
	let sendButtonY = screenHeight / 2;

	let sendButtonLeft = sendButtonX - (sendButtonSize / 2);
	let sendButtonTop = sendButtonY - (sendButtonSize / 2);

	// Render send Quest button
	favorites.push(
		<TouchableOpacity key={'c_button'} style={[styles.sendButtonContainerStyle, {top: sendButtonTop, left: sendButtonLeft}]} onPress={() => self.props.defaultRoute()}>
			<Icon name="send-o" size={sendButtonSize} color={Colors.tintColor} />
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
			<TouchableOpacity key={'s_button' + i} style={[styles.circleContainer, {top: currTop, left: currLeft}]}
							  onPress={() => self.props.selectFavourite(data[i].name, data[i].image)}>
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
		let favorites = makeFavoritesView(this);

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
