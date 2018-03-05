import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Modal, TouchableWithoutFeedback, TouchableOpacity, Text, Stylesheet, View, Image} from 'react-native';
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
const profileIconSize = 45;



export default class ProfileOverlay extends Component {
  state = {
    modalVisible: false,
  };

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  render() {
    return (
        <View style={styles.container}>
          
          <Modal
          visible={this.state.modalVisible}
          transparent={true}
          backgroundColor={modalColor}
          animationType={modalAnimation}
          onDismiss={() => this.closeModal()}>
           
            <TouchableWithoutFeedback onPress= {() => this.closeModal()} >
              <Animatable.View 
              animation={overlayAnimation}
              duration={animationDuration} 
              easing='ease'
              useNativeDriver style={styles.overlayContainer}>
              

              
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
                    <TouchableOpacity onPress={this.sendAQuest}>
                    <Icon.Button name="ios-person-outline" size={50} borderRadius={12} color={Colors.tintColor} backgroundColor="transparent">
                      <Text style={{fontFamily: 'Arial', fontSize: 25, color:Colors.tintColor }}>Friends</Text>
                    </Icon.Button>
                    </TouchableOpacity>

                    <Icon2.Button name="bag" size={35} borderRadius={12} color={Colors.tintColor} backgroundColor="transparent">
                      <Text style={{fontFamily: 'Arial', fontSize: 25, color:Colors.tintColor }}>Stash</Text>
                    </Icon2.Button>

                    <Icon.Button name="ios-cart-outline" size={35} borderRadius={12} color={Colors.tintColor} backgroundColor="transparent">
                      <Text style={{fontFamily: 'Arial', fontSize: 25, color:Colors.tintColor }}>Shop</Text>
                    </Icon.Button>
                  </View>



                </View>
             
              </Animatable.View>
        
            </TouchableWithoutFeedback>
          
          </Modal>

          <TouchableOpacity style={styles.profileIcon}>
            <Icon6 style={{position:'absolute', top: 5}} name="user" size={profileIconSize} color={Colors.tintColor} onPress={() => this.openModal()} />
          </TouchableOpacity>   

        </View>
    );
  }
}



const styles = {

  // COPY LANDING PAGE STYLES

  container: { 
    height: Layout.headerHeight,
    position:'absolute',
    width: 57,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },

  innerContainer: {
    height: '100%',
    alignItems: 'center',
    marginHorizontal: 100,
    marginBottom: 50,
  },

  profileIcon: {
    height: profileIconSize + 5,
    width: profileIconSize,
    backgroundColor: 'transparent',
  },


  // OVERLAY STYLES

  overlayContainer: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: modalColor,
  },

  profileImg: {
    top: 100,
    height: 175,
    width: 175,
    resizeMode: 'cover',
    borderRadius: 20,
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

};
