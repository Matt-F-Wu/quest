import React from 'react';
import { StackNavigator } from 'react-navigation';
// Colors
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
// Screen imports
import CameraNav from '../notificationsScreens/CameraNav';
import ViewQuest from '../notificationsScreens/ViewQuest';
import FavTab from '../components/Gallery/GalleryFavTab';
import SelectLocation from '../sendQuestScreens/SelectLocation';
import AddCaption from '../sendQuestScreens/AddCaption';
import CapturePicture from '../sendQuestScreens/CapturePicture';
import Compose from '../sendQuestScreens/Compose';
import CustomizeGame from '../sendQuestScreens/CustomizeGame';
import ContactList from '../components/SendQuest/ContactList';
import SwiperNavigation from './SwiperNavigation';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: SwiperNavigation,
    },
    CameraNav: {
      screen: CameraNav,
    },
    ViewQuest: {
      screen: ViewQuest,
    },
    FavTab: {
      screen: FavTab,
    },
    ContactList: {
      screen: ContactList
    },
    Compose: {
      screen: Compose,
    },
    CapturePicture: {
      screen: CapturePicture,
    },
    AddCaption: {
      screen: AddCaption,
    },
    SelectLocation: {
      screen: SelectLocation,
    },
    CustomizeGame: {
      screen: CustomizeGame,
    },
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: Colors.backgroundColor,
      },
      headerBackStyle: {
        color: Colors.tintColor,
      },
      headerTitleStyle: {
        fontFamily: Fonts.headerFont,
        fontSize: Fonts.headerFontSize,
        color: Colors.tintColor,
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  setIndex(i){
    this.setState({index: i});
  }
  
  render() {
    return <RootStackNavigator />;
  }
}