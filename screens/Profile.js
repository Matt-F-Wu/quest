import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';
import {RkTabView} from 'react-native-ui-kitten';
import {user} from '../assets/data/dataMock';
import ProfileBlur from '../components/ProfileBlur';
import ProfileTabBlur from '../components/ProfileTabBlur';
import Touchables from '../components/Touchables';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
          
          <View style={tl_styles.row}>
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>Email: </Text>
            <Text style={tl_styles.largeText}>wuhao20@stanford.edu</Text>
            <Icon name={'edit'} size={30} style={{marginLeft: 10, color: Colors.tintColor,}} />
          </View>
          <View style={tl_styles.row}>
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>Status: </Text>
            <Text style={tl_styles.largeText}>CS Master Student at Stanford University</Text>
            <Icon name={'edit'} size={30} style={{marginLeft: 10, color: Colors.tintColor,}} />
          </View>
          
          
          <View style={tl_styles.row}>
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>Vehicles Owned:</Text>
            <Text style={[tl_styles.largeText, tl_styles.textBox]}>bike   ×</Text>
          </View>
          
          <View style={tl_styles.row}>
          <Text style={[tl_styles.largeText]}>You have</Text >
          <Text style={[tl_styles.largeText, tl_styles.orangeText]}>100 coins!</Text><Text style={tl_styles.largeText}>You can purchase:</Text>
          </View>
          <View>
          
          <View style={[tl_styles.row, tl_styles.rowGray]}>
            <Image
              source={require('../assets/images/mushroom.jpg')}
              style={{ height: 140, width: 200, margin: '2%' }}
            />
            <View>
            <Text style={[tl_styles.largeText]}>Mushroom Picking</Text >
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>[Navigation Game]</Text >
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>70 coins</Text >
            </View>
          </View>
      
          <View style={[tl_styles.row, tl_styles.rowGray]}>
            <Image
              source={require('../assets/images/robot-dev.png')}
              style={{ height: 140, width: 200, margin: '2%' }}
            />
            <View>
            <Text style={[tl_styles.largeText]}>Robot Birds</Text>
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>[Open-Message Game]</Text >
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>50 coins</Text >
            </View>
          </View>
      
          <View style={[tl_styles.row, tl_styles.rowGray]}>
            <Image
              source={require('../assets/images/snowman.jpg')}
              style={{ height: 140, width: 200, margin: '2%' }}
            />
            <View>
            <Text style={[tl_styles.largeText]}>Smash the Snowman</Text >
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>[Navigation Game]</Text >
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>60 coins</Text >
            </View>
          </View>
      
          </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContent2: {
    padding: 15,
    backgroundColor: 'white',
    margin: 10,
  },
  largeText: {
    fontSize: 20,
    padding: 5,
    marginBottom: '3%',
  },
  textBox: {
    color: 'white',
    backgroundColor: Colors.tintColor,
    borderRadius: 5,
  },
  orangeText: {
    color: 'orange',
  },
  rowGray: {
   alignItems: 'center', 
   backgroundColor: '#ccc',
   marginBottom: 2,
  },
});
