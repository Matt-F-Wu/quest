import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


// 
//	NOTE: figure out how to pass in color, prof image
// 	^ switch statement based on progress, determine color to use
//

const yellow = '#FCE02A'
const green = '#1CA53B'
const red = '#CB1B1B'


export default class ReceivedQuestLink extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			date: this.props.date,
			image: this.props.image,
			progress: this.props.progress,
			message: this.props.message,
			color: this.props.color,

		}
	}


	render() {
		return (


         	<TouchableOpacity style={styles.container} onPress={() => navigate('ViewQuest')}>
            	
            	<View style={styles.progressImageView}>
 					<Image resizeMode='cover' 
              		source={this.state.image}
              		style={[styles.profileImg, {borderColor: this.state.color}]}
            		/>
 					<Text style={{fontFamily: 'Arial', fontSize: 15, color: this.state.color, textAlign: 'center'}}>{this.state.progress}</Text>
 				</View>

			 	<View style={styles.textView}>
		            <Text style={{fontFamily: 'Arial', fontSize: 25, color: 'orange'}}>Quest from {this.state.name}</Text>
		            <Text style={{fontFamily: 'Arial', fontSize: 20, color: 'grey'}}>{this.state.message}</Text>
      			</View>

      			<View style={styles.dateView}>
      				<Text style={{fontFamily: 'Arial', fontSize: 14, color: 'grey'}}>{this.state.date} > </Text>
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
	  	height: '100%',
	  	flex: 1,
	  	justifyContent: 'center',
	},

	profileImg: {
		width: '70%',
		height: '70%',
		alignSelf: 'center',
		borderRadius: 33,
		borderWidth: 2,
	},

	textView: {
	  	top: 10,
	  	flex: 2,
	},

	dateView: {
	  	top: 15,
	  	alignItems: 'flex-end',
	  	flex: 1,
	}


});