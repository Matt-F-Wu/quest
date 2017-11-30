import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import ProfileTabBase from "./ProfileTabBase";

export default class ProfileTabBlur extends ProfileTabBase {

  getStyles(){
    return styles;
  }

  static getStyles = () => styles;

}

const styles = StyleSheet.create({
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  statContainerSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blurHigh,
    padding: 10,
  },
  titleStatText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  statText: {
    textAlign: 'center',
    color: '#888888'
  },
  statTextSelected: {
    textAlign: 'center',
    color: '#FF8C00'
  },
  valueText: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  tabView: {
    backgroundColor: Colors.blurBg,
    margin: 10,
    borderWidth: 0,
  },
  tabContent: {
    marginTop: 10,
    backgroundColor: Colors.blurPrimary,
  },
});