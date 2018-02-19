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
         <View style={tl_styles.tabContent2}>

          <View style={tl_styles.row}>
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>Email: </Text>
            <Text style={tl_styles.largeText}>wuhao20@stanford.edu</Text>
            <Icon name={'edit'} size={20} style={{marginLeft: 10, color: Colors.tintColor,}} />
          </View>

          <View style={tl_styles.row}>
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>Status: </Text>
            <Text style={tl_styles.largeText}>CS MS at Stanford University</Text>
            <Icon name={'edit'} size={20} style={{marginLeft: 10, color: Colors.tintColor,}} />
          </View>
          
          <View style={tl_styles.row}>
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>Vehicles Owned:</Text>
            <Text style={[tl_styles.largeText, tl_styles.textBox]}>bike   ×</Text>
            <Icon name={'add'} size={20} style={{marginLeft: 10, color: Colors.tintColor,}} />
          </View>
          
          <View style={tl_styles.row}>
            <Text style={[tl_styles.largeText]}>You have</Text >
            <Text style={[tl_styles.largeText, tl_styles.orangeText]}>100 coins!</Text><Text style={tl_styles.largeText}>You can purchase:</Text>
          </View>
          
          <View>
          
            <View style={[tl_styles.row, tl_styles.rowGray]}>
              <Image resizeMode="contain"
                source={require('../assets/images/mushroom.gif')}
                style={{ margin: '2%', flex: 1 }}
              />
              <View style={{flex: 1}}>
                <Text style={[tl_styles.largeText]}>Mushroom Picking</Text >
                <Text style={[tl_styles.largeText, tl_styles.orangeText]}>[Navigation Game]</Text >
                <Text style={[tl_styles.largeText, tl_styles.orangeText]}>70 coins</Text >
              </View>
            </View>
        
            <View style={[tl_styles.row, tl_styles.rowGray]}>
              <Image resizeMode="contain"
                source={require('../assets/images/bird.gif')}
                style={{ margin: '2%', flex: 1 }}
              />
              <View style={{flex: 1}}>
                <Text style={[tl_styles.largeText]}>Bird Catch</Text>
                <Text style={[tl_styles.largeText, tl_styles.orangeText]}>[Open-Message Game]</Text >
                <Text style={[tl_styles.largeText, tl_styles.orangeText]}>50 coins</Text >
              </View>
            </View>
        
            <View style={[tl_styles.row, tl_styles.rowGray]}>
              <Image resizeMode="contain"
                source={require('../assets/images/snowman.gif')}
                style={{ margin: '2%', flex: 1 }}
              />
              <View style={{flex: 1}}>
                <Text style={[tl_styles.largeText]}>Smash the Snowman</Text >
                <Text style={[tl_styles.largeText, tl_styles.orangeText]}>[Navigation Game]</Text >
                <Text style={[tl_styles.largeText, tl_styles.orangeText]}>60 coins</Text >
              </View>
            </View>
            
          </View>

         </View>
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
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContent2: {
    padding: 15,
    backgroundColor: 'white',
  },
  largeText: {
    fontSize: 16,
    padding: 5,
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
   height: 200,
   alignItems: 'center', 
   backgroundColor: '#ccc',
   marginBottom: 2,
  },
});
