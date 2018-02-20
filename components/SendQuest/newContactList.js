import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ListView,
} from 'react-native';
import Search from 'react-native-search-box';

// Component/constant imports
import Touchables from '../Touchables';
// import ContactListItem from './ContactListItem';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';


export default class ContactList extends Component {
	/*TODO: make a contact list here*/
  data = [  
  {
    name: 'Alejandrina', 
    index: 1,
    location: 'Stanford, CA',
    time: '2 weeks ago', 
    image: require('../../assets/images/profileImages/woman3.png'),
  },
  {
    name: 'Alison', 
    index: 2,
    location: 'Boston, MA',
    time: '1 year ago', 
    image: require('../../assets/images/profileImages/woman5.png'),
  },
  {
    name: 'Austin',
    index: 3, 
    location: 'Thousand Oaks, CA',
    time: '1 month ago', 
    image: require('../../assets/images/profileImages/man8.png'),
  },
  {
    name: 'Bob', 
    index: 4,
    location: 'San Francisco, CA',
    time: '3 weeks ago', 
    image: require('../../assets/images/profileImages/man6.png'),
  },
  {
    name: 'Cole', 
    index: 5,
    location: 'Stanford, CA',
    time: '1 week ago', 
    image: require('../../assets/images/profileImages/man4.png'),
  },
  {
    name: 'Cooper',
    index: 6, 
    location: 'Kauaia, HI',
    time: '1 day ago', 
    image: require('../../assets/images/profileImages/man2.png'),
  },
  {
    name: 'George',
    index: 7, 
    location: 'Los Angeles, CA',
    time: '1 year ago', 
    image: require('../../assets/images/profileImages/man9.png'),
  },
  {
    name: 'Grace', 
    index: 8,
    location: 'Vancouver, BC',
    time: '9:35 AM', 
    image: require('../../assets/images/profileImages/woman1.png'),
  },
  {
    name: 'Hao', 
    index: 9,
    location: 'Toronto, ON',
    time: '1 week ago', 
    image: require('../../assets/images/profileImages/man5.png'),
  },
  {
    name: 'Ian', 
    index: 10,
    location: 'Thousand Oaks, CA',
    time: '5 days ago', 
    image: require('../../assets/images/profileImages/man3.png'),
  },  
  {
    name: 'Jon', 
    index: 11,
    location: 'New York, NY',
    time: '3 weeks ago', 
    image: require('../../assets/images/profileImages/man7.png'),
  },
  {
    name: 'Katie', 
    index: 12,
    location: 'Bend, OR',
    time: '4 days ago',
    image: require('../../assets/images/profileImages/woman2.png'),
  },
  {
    name: 'Lily', 
    index: 13,
    location: 'Providence, RI',
    time: '2 months ago', 
    image: require('../../assets/images/profileImages/woman4.png'),
  },
  {
    name: 'Nicole', 
    index: 14,
    location: 'Phoenix, AZ',
    time: '10:01 AM',
    image: require('../../assets/images/profileImages/woman7.png'),
  },
  {
    name: 'Samantha', 
    index: 15,
    location: 'Cincinnati, OH',
    time: '1 year ago', 
    image: require('../../assets/images/profileImages/woman6.png'),
  },
];



  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.data),
    };
  }

  // Important: You must return a Promise
  beforeFocus = () => {
      return new Promise((resolve, reject) => {
          console.log('beforeFocus');
          resolve();
      });
  }

  // Important: You must return a Promise
  onFocus = (text) => {
      return new Promise((resolve, reject) => {
          console.log('onFocus!', text);
          resolve();
      });
  }

  // Important: You must return a Promise
  afterFocus = () => {
      return new Promise((resolve, reject) => {
          console.log('afterFocus!');
          resolve();
      });
  }

  renderRow(item){
    
    return (
      <Touchables key={item.index} 
              onClick={() => this.props.toMap(item)}
              onLongPress={() => this.props.navigatorVal('Friend')} 
              hasImage={true} 
              title={item.name} subTitle={item.location}
              text={item.time} styles={styles} 
              image={item.image}/>
      );
  }

	render() {

    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor}}>
        <Search
          backgroundColor={Colors.tintColor}
          placeholder='Search contacts'
          ref="search_box"
          onSearch={(keyword) => {
            var dataArray = [];
            for(var i = 0; i < this.data.length; i++){
              if(this.data[i].name.toLowerCase().includes(keyword.toLowerCase())
                || this.data[i].location.toLowerCase().includes(keyword.toLowerCase())){
                  dataArray.push(this.data[i]);
                }
            }
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({ dataSource: ds.cloneWithRows(dataArray)});
          }}
          onCancel={() => {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({ dataSource: ds.cloneWithRows(this.data)});
            }
          }
        />

        <ListView
          removeClippedSubviews={false}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          rowHeight={100}
          sectionHeaderHeight={40}
        />
      </View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  rowStyle: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: Colors.backgroundColor,
    borderBottomColor: '#333333',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flexWrap: 'wrap',
  },
  cardStyle: {
  	flexDirection: 'column',
  	marginLeft: 20,
  },
  title: {
    fontFamily: Fonts.bodyFont,
  	color: Colors.tintColor,
  	fontSize: 18,
  },
  subTitle: {
    fontFamily: Fonts.accentFont,
  	color: Colors.accentColor,
  },
  text: {
    fontFamily: Fonts.accentFont,
  	color: Colors.secondaryAccentColor,
  },
  imageContainer: {
  	width: 80,
  	height: 80,
  },
  contactImg: {
  	width: 80,
  	height: 80,
  	borderRadius: 40,
  },
});