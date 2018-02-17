import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

import {RkButton, RkText} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

export default class ProfileBlur extends Component {

  render() {
    let user = this.props.user;
    return (
        <View style={styles.head}>
          
          <View style={styles.shadowImage}>
            <Image source={user.avatar} style={styles.avatar}/>
          </View>

          <View style={styles.textBox}>
            <RkText style={[styles.text, styles.specialText]}>
              Coin Count: 100
            </RkText>
            <RkText
              style={[styles.text, styles.nameText]}>{user.name.first} {user.name.last}</RkText>
            <RkText style={[styles.text, styles.statusText]}>
              CS Masters Student at Stanford University
            </RkText>
          </View>
          
        </View>
    )
  }

}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: Colors.blurOrange,
    borderWidth: 3,
    shadowColor: 'black',
    shadowRadius: 10,
  },
  shadowImage:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 20,
    height: 100,
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.blurText,
    borderStyle: 'dotted',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.blurBg,
  },
  buttonInner: {
    color: 'white'
  },
  buttonIconInner: {
    color: 'white',
    fontSize: 32,
    width: 25,
    height: 35
  },
  text: {
    textAlign: 'center'
  },
  specialText:{
    color: Colors.tintColor,
    fontWeight: 'bold',
  },
  followButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 50,
    marginTop: 15,
    marginBottom: 5,
  },
  onlineText: {
    marginTop: 3,
    marginBottom: 5,
    fontWeight: '100'
  },
  nameText: {
    marginBottom: 3,
    fontSize: 26,
    fontWeight: 'bold'
  },
  statusText: {
    fontSize: 14,
    fontWeight: '100'
  }
});