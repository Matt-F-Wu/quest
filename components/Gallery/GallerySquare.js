import React from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Colors
import Colors from '../../constants/Colors';


export default class GallerySquare extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			date: this.props.date,
			image: this.props.image,
			// flex: this.props.size,
		}
	}


	render() {
		return (

		  	<View style={{height:200}}>
            	
            	<Image resizeMode='cover' 
              		source={this.state.image}
              		style={styles.questImg}
            	/>
			 	<View style={styles.questInfo}>
  					<Text style={styles.questWriting}> {this.state.name} </Text>
  					<Text style={styles.questWriting}> {this.state.date} </Text>
      			</View>
      		</View>

		);
	}
}



const styles = StyleSheet.create({

	questInfo: {
		position: 'absolute', 
	},

	questWriting: {
		color: 'white'		
	},

	questImg: {
		width: '100%',
		height: '100%',
		borderWidth: 1,
		borderRadius: 3,
		borderColor: Colors.backgroundColor,
	},
});
