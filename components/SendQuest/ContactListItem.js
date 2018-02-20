import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// Colors, Fonts
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

// Icons
import Icon from 'react-native-vector-icons/EvilIcons';


<ContactListItem 
    name={item.name} 
    location={item.location}
    time={item.time} 
    image={item.image} 
    onPress={() => {this.props.toMap(item)}}/>
);

export default class QuestListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,					// Name to be displayed
			date: this.props.date,					// Date received/sent
			image: this.props.image,				// Profile picture of user
			progressColor: Colors.accentColor,		// Color of circle border around prof pic
			progressBorderWidth: 1,					// Width of circle border around prof pic
		}		
	}

	/* Set progress border color/width */
	setProgressBorder = () => {
		if (this.props.progress == 'unopened') {
			this.setState({
				progressColor: Colors.tintColor,
				progressBorderWidth: 2,
			});
		}
	}

	/* Set progress border color/width */
	componentDidMount() {
		this.setProgressBorder();
	}





	render() {
		return (

         	<TouchableOpacity style={styles.container} onPress={this.props.onPress}>
            	
            	<View style={styles.progressImageView}>
            		<View style={[styles.circleContainer, {borderColor: this.state.progressColor, borderWidth: this.state.progressBorderWidth}]}> 
	 					<Image resizeMode='cover' 
	 						source={this.state.image}
	              			style={[styles.profileImg]}
	            		/>
	            	</View>
 				</View>

			 	<View style={styles.textView}>
		            <Text style={{fontFamily: Fonts.itemFont, fontSize: Fonts.itemFontSize, color: Colors.tintColor}}>{this.state.name}</Text>
		            <Text style={{fontFamily: Fonts.accentFont, fontSize: Fonts.accentFontSize, color: Colors.accentColor}}>{this.state.date}</Text>
		            <Icon name="chevron-right" size={37} color={Colors.accentColor} style={{position:'absolute', top: 10, right: 10}}/>
      			</View>

		  	</TouchableOpacity>
		);
	}
}


const styles = StyleSheet.create({

	container: {
    	height: 100,
    	display: 'flex',
    	flexDirection: 'row',
  	},

	progressImageView: {
	  	flex: 1,
	  	justifyContent: 'center',
	},

	circleContainer: {
		width: 80,
		height: 80,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 80/2,
	},

	profileImg: {
		width: 70,
		height: 70,
		borderRadius: 70/2,
		backgroundColor: 'transparent',
	},

	textView: {
	  	height: 70,
	  	alignSelf: 'flex-end',
	  	flex: 2,
	  	borderBottomWidth: 1,
	  	borderBottomColor: Colors.accentColor,
	},
});