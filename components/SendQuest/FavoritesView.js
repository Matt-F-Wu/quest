import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// Colors, Fonts
import Colors from '../../constants/Colors';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';

data = [ 
	{
    	name: 'Lily', 
	    image: require('../../assets/images/profileImages/woman4.png'),
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
	    name: 'Austin',
	    image: require('../../assets/images/profileImages/man8.png'),
  	},
    {
	    name: 'Grace', 
	    image: require('../../assets/images/profileImages/woman1.png'),
  	},
];



renderZeroFavoriteView = () => {
	return (
		<View>
			<TouchableOpacity style={styles.addButtonContainerStyle}>
				<Icon2 name="ios-add-circle-outline" size={80} color={Colors.tintColor}/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.sendButtonContainerStyle}>
				<Icon name="send-o" size={70} color={Colors.tintColor}/>
			</TouchableOpacity>
		</View>
	)
}

renderOneFavoriteView = () => {
	return (
		<View>
			<TouchableOpacity style={[styles.circleContainer, {position:'relative'}]}> 
	 			<Image resizeMode='cover' 
				   	   source={data[0].image}
	      		       style={[styles.profileImg]} />
	        </TouchableOpacity>
			<TouchableOpacity style={styles.sendButtonContainerStyle}>
				<Icon name="send-o" size={70} color={Colors.tintColor}/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.addButtonContainerStyle}>
				<Icon2 name="ios-add-circle-outline" size={80} color={Colors.tintColor}/>
			</TouchableOpacity>

		</View>
	)
}

renderTwoFavoriteView = () => {
	return (
		<View style={styles.favoritesContainer}>
			<TouchableOpacity style={styles.sendButtonContainerStyle}>
				<Icon name="send-o" size={70} color={Colors.tintColor}/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.addButtonContainerStyle}>
				<Icon2 name="ios-add-circle-outline" size={80} color={Colors.tintColor}/>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.circleContainer, {top: 250, left: 30}]}> 
				<Image resizeMode='cover' 
			   		   source={data[0].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity>
  		   	<TouchableOpacity style={[styles.circleContainer, {top: 250, right: 30}]}> 
	  		   	<Image resizeMode='cover' 
			   		   source={data[1].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity>
		</View>
	)
}

renderThreeFavoriteView = () => {
	return (
		<View style={styles.favoritesContainer}>
			<TouchableOpacity style={styles.sendButtonContainerStyle}>
				<Icon name="send-o" size={70} color={Colors.tintColor}/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.addButtonContainerStyle}>
				<Icon2 name="ios-add-circle-outline" size={80} color={Colors.tintColor}/>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.circleContainer, {top: 250, left: 30}]}> 
				<Image resizeMode='cover' 
		   		   	   source={data[0].image}
  		   		   	   style={[styles.profileImg]} />
  		    </TouchableOpacity>
  		    <TouchableOpacity style={[styles.circleContainer, {top: 140, alignSelf: 'center'}]}> 
	  		   	<Image resizeMode='cover' 
			   		   source={data[1].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity>
  		   	<TouchableOpacity style={[styles.circleContainer, {top: 250, right: 30}]}> 
	  		   	<Image resizeMode='cover' 
			   		   source={data[2].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity>
		</View>
	)
}

renderFourFavoriteView = () => {
	return (
		<View style={styles.favoritesContainer}>
			<TouchableOpacity style={styles.sendButtonContainerStyle}>
				<Icon name="send-o" size={70} color={Colors.tintColor}/>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.addButtonContainerStyle, {position: 'absolute', top: 380, right: 30}]}>
				<Icon2 name="ios-add-circle" size={80} color={Colors.tintColor}/>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.circleContainer, {top: 380, left: 30}]}> 
				<Image resizeMode='cover' 
			   		   source={data[0].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity>
  		   	<TouchableOpacity style={[styles.circleContainer, {top: 230, left: 30}]}> 
	  		   	<Image resizeMode='cover' 
			   		   source={data[1].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity>
  		   	<TouchableOpacity style={[styles.circleContainer, {top: 120, alignSelf: 'center'}]}> 
	  		   	<Image resizeMode='cover' 
			   		   source={data[2].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity>
  		   	<TouchableOpacity style={[styles.circleContainer, {top: 230, right: 30}]}> 
	  		   	<Image resizeMode='cover' 
			   		   source={data[3].image}
	  		   		   style={[styles.profileImg]} />
			</TouchableOpacity>
		</View>	
	)
}

renderFiveFavoriteView = () => {
	return (
		<View style={styles.favoritesContainer}>
			<TouchableOpacity style={styles.sendButtonContainerStyle}>
				<Icon name="send-o" size={70} color={Colors.tintColor}/>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.circleContainer, {top: 380, left: 30}]}> 
				<Image resizeMode='cover' 
			   		   source={data[0].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity>
  		   	<TouchableOpacity style={[styles.circleContainer, {top: 230, left: 30}]}> 
	  		   	<Image resizeMode='cover' 
			   		   source={data[1].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity>
  		   	<TouchableOpacity style={[styles.circleContainer, {top: 120, alignSelf: 'center'}]}>  
	  		   	<Image resizeMode='cover' 
			   		   source={data[2].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity>
  		   	<TouchableOpacity style={[styles.circleContainer, {top: 230, right: 30}]}> 
	  		   	<Image resizeMode='cover' 
			   		   source={data[3].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity> 
  		   	<TouchableOpacity style={[styles.circleContainer, {top: 380, right: 30}]}>
	  		   	<Image resizeMode='cover' 
			   		   source={data[4].image}
	  		   		   style={[styles.profileImg]} />
  		   	</TouchableOpacity>
		</View>	
	)
}





makeFavoritesView = () => {
	let favorites = null;
	if (data.length == 0) {
		favorites = renderZeroFavoriteView();
	} else if (data.length == 1) {
		favorites = renderOneFavoriteView();
	} else if (data.length == 2) {
		favorites = renderTwoFavoriteView();
	} else if (data.length == 3) {
		favorites = renderThreeFavoriteView();
	} else if (data.length == 4) {
		favorites = renderFourFavoriteView();
	} else if (data.length == 5) {
		favorites = renderFiveFavoriteView();
	}
	return (
		favorites
	)
}



export default class FavoritesView extends React.Component {

	render() {

		favorites = makeFavoritesView();

		return (
			<View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}>
				{favorites}
			</View>
		);
	}



}


const styles = StyleSheet.create({
	favoritesContainer: {
		height: '100%', 
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},

	sendButtonContainerStyle: {
		backgroundColor: 'transparent',
		paddingVertical: 40,
		paddingHorizontal: 40,
	},

	addButtonContainerStyle: {
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},

	circleContainer: {
		position: 'absolute',
		width: 80,
		height: 80,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 80/2,
		borderColor: Colors.tintColor,
		borderWidth: 2,
	},

	profileImg: {
		width: 70,
		height: 70,
		borderRadius: 70/2,
		backgroundColor: 'transparent',
	},
});
