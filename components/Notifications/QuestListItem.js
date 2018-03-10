import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// Colors, Fonts
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

// Icons
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';


export default class QuestListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,					// Name to be displayed
			date: this.props.date,					// Date received/sent
			image: this.props.image,				// Profile picture of user
			received: this.props.received,			// True if received, False if sent
			progress: this.props.progress,			// unopened || completed
			progressColor: Colors.accentColor,		// Color of circle border around prof pic
			progressBorderWidth: 1,					// Width of circle border around prof pic
			profileImage: null,
		}		
	}

	/* Set progress border color/width */
	setProgressBorder = () => {
		if (this.state.progress == 'unopened') {
			this.setState({
				progressColor: Colors.tintColor,
				progressBorderWidth: 2,
			});
		}else if(this.state.progress == 'in progress'){
			this.setState({
				progressColor: 'orange',
				progressBorderWidth: 2,
			});
		}
		if (this.state.received == true) {
			this.setState({
				progressColor: 'transparent',
			});
		}
	}

	/* Set profile image to picture, or ? mark if unopened and recevied */
	setProfileImage = () => {
		if (this.state.received == true && this.state.progress != 'completed') {
			this.setState({
				profileImage: <Icon2 name="question" 
									size={75} 
									color={this.state.progress == 'unopened'? Colors.tintColor : 'orange'} 
									style={{backgroundColor: 'transparent', alignSelf: 'center', top:3}}/>
			});		
	 	} else {
	 		this.setState({
			 	profileImage: <Image resizeMode='cover' 
									 source={this.state.image}
      								 style={[styles.profileImg]} />
	 		});
	 	}
	}

	/* Set progress border color/width */
	componentDidMount() {
		this.setProgressBorder();
		this.setProfileImage();
	}


	render() {
		let bc = this.props.highlight? Colors.blurOrange : 'transparent';

		return (

         	<TouchableOpacity style={[styles.container, {backgroundColor: bc}]} onPress={this.props.onPress}>
            	
            	<View style={styles.progressImageView}>
            		<View style={[styles.circleContainer, {borderColor: this.state.progressColor, borderWidth: this.state.progressBorderWidth}]}> 
	 					{this.state.profileImage}
	            	</View>
 				</View>

			 	<View style={styles.textView}>
		            <Text style={{fontFamily: Fonts.bodyFont, fontSize: Fonts.bodyFontSize, color: this.state.progress == 'unopened'? Colors.tintColor : 'orange'}}>{this.state.name}</Text>
		            <Text style={{fontFamily: Fonts.accentFont, fontSize: Fonts.accentFontSize, color: Colors.accentColor}}>{this.state.date}</Text>
		            <Text style={{fontFamily: Fonts.accentFont, fontSize: Fonts.accentFontSize, color: this.state.progress == 'unopened'? Colors.tintColor : 'orange'}}>{this.state.progress}</Text>
		            <Icon name="chevron-right" size={37} color={Colors.accentColor} style={{position:'absolute', top: 30, right: 10}}/>
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
	  	justifyContent: 'center',
	  	alignItems: 'center',
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
		flex: 1,
	  	height: '100%',
	  	marginLeft: 20,
	  	borderBottomWidth: 1,
	  	borderBottomColor: Colors.accentColor,
	  	justifyContent: 'center',
	},
});