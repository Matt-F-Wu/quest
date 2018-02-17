import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Modal, TouchableWithoutFeedback, TouchableOpacity, Text, Stylesheet, View, Image, FlatList, Dimensions} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

// Icon imports
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';

// Colors
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

// Component imports
import GallerySquare from './GallerySquare';


const modalColor = 'rgba(0, 0, 0, 1.0)';
const modalAnimation = 'fade';
const overlayAnimation = 'fadeInDown';
const animationDuration = 1000;

const questsArr = [
  {
    name: 'Katie', 
    date: 'Received 4 days ago',
    img: require('../../assets/images/galleryImages/gallery1.jpg')
  },
  {
    name: 'Ian', 
    date: 'Sent 5 days ago', 
    img: require('../../assets/images/galleryImages/gallery2.jpg')
  },
  {
    name: 'Cole', 
    date: 'Sent 1 week ago', 
    img: require('../../assets/images/galleryImages/gallery3.jpg')
  },
  {
    name: 'Hao', 
    date: 'Sent 1 week ago', 
    img: require('../../assets/images/galleryImages/gallery4.jpg')
  },
  {
    name: 'Alejandrina', 
    date: 'Received 2 weeks ago', 
    img: require('../../assets/images/galleryImages/gallery5.jpg')
  },
  {
    name: 'Bob', 
    date: 'Received 3 weeks ago', 
    img: require('../../assets/images/galleryImages/gallery6.jpg')
  },
  {
    name: 'Jon', 
    date: 'Received 3 weeks ago', 
    img: require('../../assets/images/galleryImages/gallery7.jpg')
  },
  {
    name: 'Austin', 
    date: 'Sent 1 month ago', 
    img: require('../../assets/images/galleryImages/gallery8.jpg') 
  },
  {
    name: 'Lily', 
    date: 'Sent 2 months ago', 
    img: require('../../assets/images/galleryImages/gallery9.jpg')
  },
  {
    name: 'Alison', 
    date: 'Sent 1 year ago', 
    img: require('../../assets/images/galleryImages/gallery10.jpg') 
  },
  {
    name: 'Samantha', 
    date: 'Received 1 year ago', 
    img: require('../../assets/images/galleryImages/gallery11.jpg')
  },
  {
    name: 'George', 
    date: 'Received 1 year ago', 
    img: require('../../assets/images/galleryImages/gallery12.jpg')
  },
  // ['Jason', 'Received 2 years ago', require('../../assets/images/galleryImages/gallery13.jpg')],
  // ['Elizabeth', 'Sent 2 years ago', require('../../assets/images/galleryImages/gallery14.jpg')]
];


export default class GalleryAllTab extends Component {

  state = {
    modalVisible: false,
    questToDisplay: 0,
    nameToDisplay: '',
    dateToDisplay: '',
    // imgWidth:0,
    // imgHeight:0,
  };

  static navigationOptions = {
    tabBarLabel: 'Gallery'
  }

  openModal = (item) => {
    this.setState({questToDisplay:item.img});
    this.setState({nameToDisplay:item.name});
    this.setState({dateToDisplay:item.date});
    // this.calculateImgSize();
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  // calculateImgSize() {
  //     Image.getSize('../../assets/images/galleryImages/gallery1.jpg', (width, height) => {
  //     // calculate image width and height 
  //     const screenWidth = Dimensions.get('window').width
  //     const scaleFactor = width / screenWidth
  //     const imageHeight = height / scaleFactor
  //     this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
  //     })
  // }

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
              
                <View style={styles.modalHeader}>
                  <Text style={{fontFamily: 'Arial', fontSize: 35, color: Colors.tintColor}}> {this.state.nameToDisplay} </Text>
                  <Text style={{fontFamily: 'Arial', fontSize: 16, color: Colors.tintColor, paddingLeft: 6.5}}> {this.state.dateToDisplay} </Text>
                </View>


                <View style={styles.modalImage}>
                  <Image 
                    resizeMode='cover' 
                    source={this.state.questToDisplay}
                    style={{width: '100%', height: '100%'}}
                    // style={{width: this.state.imgWidth, height: this.state.imgHeight}}
                  />
                </View>
             
                <View style={styles.modalFooter}>
                  <Icon.Button iconStyle={styles.buttonStyle} name="ios-chatboxes" size={27} color={Colors.tintColor} backgroundColor="transparent" onPress={this.SendAQuest}>
                    <Text style={{fontFamily: Fonts.itemFont, fontSize: 14, color: Colors.tintColor}}>Go to conversation</Text>
                  </Icon.Button>

                  <Icon.Button iconStyle={styles.buttonStyle} name="ios-heart-outline" size={27} color={Colors.tintColor} backgroundColor="transparent" onPress={this.SendAQuest}>
                    <Text style={{fontFamily: Fonts.itemFont, fontSize: 14, color: Colors.tintColor}}>Favorite</Text>
                  </Icon.Button>

                  <Icon2.Button iconStyle={styles.buttonStyle} name="reply" size={27} color={Colors.tintColor} backgroundColor="transparent" onPress={this.SendAQuest}>
                    <Text style={{fontFamily: Fonts.itemFont, fontSize: 14, color: Colors.tintColor}}>Send a Quest</Text>
                  </Icon2.Button>
                </View>



              </Animatable.View>
        
            </TouchableWithoutFeedback>
          
          </Modal>

          <FlatList contentContainerStyle={styles.contentContainer}
            data={questsArr}
            numColumns={1}
            keyExtractor={item => item.name}  // Key is concatenation of name, date, image url
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.openModal(item)}>
                <GallerySquare name={item.name} date={item.date} image={item.img} size={1}/>
              </TouchableOpacity>
            )}
          />

        </View>
    );
  }
}



const styles = {

  // OVERLAY STYLES
  overlayContainer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: modalColor,
  },

  modalHeader: {
    top: 10,
    alignSelf: 'flex-start',
    flexDirection: 'column',
  },

  modalImage: {
    width: '100%', 
    height: '50%', 
    alignSelf: 'center',
  },

  modalFooter: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.tintColor,
  },

  buttonStyle: {
    marginRight: 2.5,
  },


  // FLATLIST STYLES
  container: {
    height: '100%',
    backgroundColor: Colors.backgroundColor
  },

  contentContainer: {
    backgroundColor: 'transparent',
  },
};
