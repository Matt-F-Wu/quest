import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import Colors from '../constants/Colors';
import {RkTabView} from 'react-native-ui-kitten';
import {user} from '../assets/data/dataMock';
import ProfileBlur from '../components/ProfileBlur';
import ProfileTabBlur from '../components/ProfileTabBlur';
import Touchables from '../components/Touchables';

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerTintColor: Colors.tintColor,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let ProfileComponent = ProfileBlur;
    return (
      <View style={tl_styles.container}>

        <ScrollView
          automaticallyAdjustContentInsets={true}>
          <ProfileComponent user={user}/>
          <View
            style={tl_styles.container}>
            {this._renderTabs()}
          </View>
        </ScrollView>
      </View>
    );
  }

  _renderTabs() {
    let ProfileTab = ProfileTabBlur;
    let styles = ProfileTab.getStyles();
    const { navigate } = this.props.navigation;
    return (
      <RkTabView tabsContainerStyle={tl_styles.tabView}>
        
        <RkTabView.Tab title={(selected) => <ProfileTab selected={selected} name='2' value='New Quests! '/>}>
          <View style={tl_styles.tabContent}>

            <ScrollView contentContainerStyle={tl_styles.contentContainer}>
                <Touchables onClick={() => navigate('CameraNav')} hasImage={false} 
                title={'You have received a new quest!'} subTitle={'10 Minutes ago'}
                text={'Click to begin your quest'} styles={tl_styles} />
                <Touchables onClick={() => navigate('CameraNav')} hasImage={false} 
                title={'You have received a new quest!'} subTitle={'1 day ago'}
                text={'Click to begin your quest'} styles={tl_styles} />
            </ScrollView>

          </View>
        </RkTabView.Tab>

        <RkTabView.Tab title={(selected) => <ProfileTab selected={selected} name='' value='Account '/>}>
          <View style={tl_styles.tabContent2}>
            <Text>Email: </Text>
            <Text>My Location: </Text>
          </View>
        </RkTabView.Tab>
        
      </RkTabView>
    );
  }

}

const tl_styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexWrap: 'wrap',
  },
  rowStyle: {
    marginTop: 10,
    padding: 15,
    height: 'auto',
    backgroundColor: Colors.noticeBackground,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  subTitle: {
    fontSize: 16,
    color: 'white'
  },
  text: {
    fontStyle: 'italic',
    fontSize: 16,
    color: 'white'
  },
  tabContent2: {
    padding: 15,
    backgroundColor: 'white',
  }
});
