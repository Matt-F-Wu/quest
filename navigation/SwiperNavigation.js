import React, {Component} from 'react';
import { Platform, View, StyleSheet } from 'react-native';

// Colors
import Colors from '../constants/Colors';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';

// Component imports
import Swiper from '../api/customSwiper';
import GalleryTabNavigator from './GalleryTabNavigator';
import Notifications from './NotificationsNavigation';
import SendNavigation from './SendNavigation';


export default class SwiperNavigation extends Component {
  state = {index: 1};

  setIndex(i){
    this.setState({index: i});
  }

  render() {
    let prevButton = <Icon name="ios-chatboxes-outline" size={30} color={Colors.tintColor} />
    let selectedPrevButton = <Icon name="ios-chatboxes" size={30} color={Colors.tintColor} />

    let nextButton = <Icon name="ios-apps-outline" size={30} color={Colors.tintColor} />
    let selectedNextButton = <Icon name="ios-apps" size={30} color={Colors.tintColor} />

    let homeButton = <Icon name="ios-home-outline" size={55} color={Colors.tintColor} />
    let selectedHomeButton = <Icon name="ios-home" size={55} color={Colors.tintColor} />

    return (
      
      <Swiper 
        loop={false}
        index={this.state.index}
        showsPagination={false}
        showsButtons={true}
        prevButton={prevButton}
        selectedPrevButton={selectedPrevButton}
        nextButton={nextButton}
        selectedNextButton={selectedNextButton}
        homeButton={homeButton}
        selectedHomeButton={selectedHomeButton}
        style={{backgroundColor:Colors.backgroundColor}}
        >
        
        <Notifications/>
        <SendNavigation/>
        <GalleryTabNavigator/>
      
      </Swiper>

    );
  }
}

