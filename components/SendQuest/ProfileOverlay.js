import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback, TouchableOpacity, Text, StyleSheet, View, Image, Dimensions} from 'react-native';
import ExpandableView from '../ExpandableView';
import * as Animatable from 'react-native-animatable';

// Color, layout
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

// Icon imports
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/EvilIcons'
import { Ionicons } from '@expo/vector-icons';


const modalColor = 'rgba(0, 0, 0, .75)';
const modalAnimation = 'fade';
const overlayAnimation = 'fadeInDown';
const animationDuration = 1000;

var screenWidth = 0;
var screenHeight = 0;

export default class ProfileOverlay extends Component {
  state = {
    modalVisible: false,
  };

  toggleModal() {
    let nv = !this.state.modalVisible;
    //console.debug(nv + " Trying to open: " + screenWidth + " " + screenHeight);
    this.setState({modalVisible:nv});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  componentDidMount(){
    screenWidth = Dimensions.get('window').width;
    screenHeight = Dimensions.get('window').height;
  }

  render() {
    return (  
        <ExpandableView style={{position: 'absolute', backgroundColor: Colors.blackMask}}
          config={{initialWidth: 0, initialHeight: 0, endWidth: screenWidth, endHeight: screenHeight, anchorX: 0, anchorY: 0}}
          expand={this.state.modalVisible}
          down={true}>
         
          <TouchableWithoutFeedback 
            style={{width: '100%', height: '100%', alignItems: 'center'}}
            onPress= {() => {console.debug("Touched outside..."); 
            this.closeModal();}} >
            
              <View style={styles.innerContainer}>
                  
                  <Image 
                    source={require('../../assets/images/profileImages/ian.jpg')}
                    style={styles.profileImg}
                  />

                  <View style={styles.info}>
                    <Text style={styles.text}> ianjones763 | Coins: 525 </Text>
                    <View style={styles.settings}>
                      <Icon3 name="bicycle" size={25} color={Colors.tintColor} />
                      <Icon4 name="more-vertical" size={25} color={Colors.tintColor}  />
                      <Icon5 name="car-side" size={35} color={Colors.tintColor}  />
                      <Icon4 name="more-vertical" size={25} color={Colors.tintColor}  />
                      <Icon2 name="settings" size={25} color={Colors.tintColor} />
                    </View>
                  </View>
         
                  <View style={styles.buttons}>
                    <Icon.Button name="ios-person-outline" size={50} borderRadius={12} 
                      color={Colors.tintColor} 
                      backgroundColor="transparent"
                      onPress={() => {this.props.toProfile(); console.debug("Go!!!")}}>
                      <Text style={{fontFamily: 'Arial', fontSize: 25, color:Colors.tintColor }}>Friends</Text>
                    </Icon.Button>

                    <Icon2.Button name="bag" size={35} borderRadius={12} color={Colors.tintColor} backgroundColor="transparent">
                      <Text style={{fontFamily: 'Arial', fontSize: 25, color:Colors.tintColor }}>Stash</Text>
                    </Icon2.Button>

                    <Icon.Button name="ios-cart-outline" size={35} borderRadius={12} color={Colors.tintColor} backgroundColor="transparent">
                      <Text style={{fontFamily: 'Arial', fontSize: 25, color:Colors.tintColor }}>Shop</Text>
                    </Icon.Button>
                  </View>

              </View>
      
          </TouchableWithoutFeedback>
        
        </ExpandableView>   
    );
  }
}



const styles = StyleSheet.create({
  innerContainer: {
    height: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },

  // OVERLAY STYLES

  overlayContainer: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: modalColor,
  },

  profileImg: {
    top: 100,
    marginBottom: 10,
    height: 175,
    width: 175,
    resizeMode: 'cover',
    borderRadius: 20,    // rectangle container
    // borderRadius: 175/2,    // Perfect circle 
    borderColor: Colors.tintColor,
    borderWidth: 1,
  },

  info: {
    top: 105,
  },

  text: {
    color: Colors.tintColor,
  },

  buttons: {
    top: 120,
    backgroundColor: 'transparent',
  },

  settings: {
    display: 'flex',
    flexDirection: 'row',
    top: 10,
    justifyContent: 'center',
  },

});
