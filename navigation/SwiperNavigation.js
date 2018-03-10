import React, {Component} from 'react';
import { Platform, View, StyleSheet } from 'react-native';

// Colors
import Colors from '../constants/Colors';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';

// Component imports
import Swiper from '../api/customSwiper';
import GalleryTabNavigator from './GalleryTabNavigator';
import ActiveStackNavigator from './ActiveStackNavigator';
import SendNavigation from './SendNavigation';


export default class SwiperNavigation extends Component {
  state = {index: 1, num_notif: 0};

  setIndex(i){
    //Hao: This doesn't actually work, but have no time to fix this...
    this.swiper.setIndex(i);
  }

  oneMoreNotif(){
    this.swiper.oneMoreNotif();
  }

  render() {
    let prevButton = <Icon name="ios-notifications-outline" size={35} color={Colors.tintColor} />;
    let selectedPrevButton = <Icon name="ios-notifications" size={35} color={Colors.tintColor} />;

    let nextButton = <Icon name="ios-apps-outline" size={35} color={Colors.tintColor} />;
    let selectedNextButton = <Icon name="ios-apps" size={35} color={Colors.tintColor} />;

    let homeButton = <Icon name="ios-home-outline" size={55} color={Colors.tintColor} />;
    let selectedHomeButton = <Icon name="ios-home" size={55} color={Colors.tintColor} />;

    return (
      
      <Swiper ref={(ref) => this.swiper = ref} 
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
        
        <ActiveStackNavigator/>
        <SendNavigation/>
        <GalleryTabNavigator/>
      
      </Swiper>

    );
  }
}

