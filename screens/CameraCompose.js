import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import Colors from '../constants/Colors';
import CameraBase from '../components/CameraBase';

export default class CameraCompose extends CameraBase {

	customize(num) {
		//This view does not have coins/objects
		this.setState({has_button: true, has_objects: false, 
			objects: [], styles: styles});
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    flexWrap: 'wrap',
  },
  rowStyle: {
    padding: 10,
    height: 'auto',
    backgroundColor: Colors.noticeBackground,
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  },
  button: {
  	borderWidth: 1,
    borderColor: Colors.blurText,
    borderStyle: 'dotted',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.tintColor,
  },
  imageContainer: {
  	width: 80,
  	height: 80,
  },
  contactImg: {
  	width: 80,
  	height: 80,
  	borderRadius: 40,
  },
});