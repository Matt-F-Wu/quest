import React, { Component } from 'react';
import {Text, TouchableHighlight, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

export default class Touchables extends Component {

  _renderImage() {
  	//If has image in list item, then show that image
  	let styles = this.props.styles;
  	if(this.props.hasImage){
  		return (
  				<View style={styles.imageContainer}>
		        	<FastImage resizeMode='cover'
		              source={this.props.image}
		              style={styles.contactImg}
		            />
		        </View>
  			);
  	}else{
  		return null;
  	}
  }

  render() {
  	let styles = this.props.styles;
    return (
      <TouchableHighlight onPress={this.props.onClick} onLongPress={this.props.onLongPress} underlayColor="white">
      <View style={styles.rowStyle}>
      		{this._renderImage()}
	    	<View style={styles.cardStyle}>
	        	<Text style={styles.title}>{this.props.title}</Text>
	        	<Text style={styles.subTitle}>{this.props.subTitle}</Text>
	        	<Text style={styles.text}>{this.props.text}</Text>
	    	</View>
      </View>
      </TouchableHighlight>
    );
  }
}