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
import Touchables from '../components/Touchables';
import Search from 'react-native-search-box';
import Colors from '../constants/Colors';

export default class ContactList extends Component {
	/*TODO: make a contact list here*/
  data = [
        {index: 3, name: 'Ariel', location: 'Beijing, China', time: '32 days ago', image: require('../assets/images/person7.jpg')}, 
        {index: 4, name: 'Brian', location: 'Stanford, CA, USA', time: '22 days ago', image: require('../assets/images/person1.jpg')}, 
        {index: 5, name: 'Christopher', location: 'Stanford, CA, USA', time: '17 days ago', image: require('../assets/images/person2.jpg')}, 
        {index: 6, name: 'Dilu', location: 'Stanford, CA, USA', time: '12 days ago', image: require('../assets/images/person3.jpg')}, 
        {index: 7, name: 'Eason', location: 'Stanford, CA, USA', time: '6 days ago', image: require('../assets/images/person5.jpg')}, 
        {index: 8, name: 'Fanfan', location: 'Stanford, CA, USA', time: '2 days ago', image: require('../assets/images/person6.jpg')}, 
        {index: 1, name: 'Lily Wang', location: 'Toronto, ON, Canada', time: '62 days ago', image: require('../assets/images/lilyP.jpg')}, 
        {index: 2, name: 'Mark', location: 'Stanford, CA, USA', time: '51 days ago', image: require('../assets/images/person4.jpg')}, 
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
      <View style={{ flex: 1}}>
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
    backgroundColor: '#fff',
  },
  rowStyle: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
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
  	color: 'orange',
  	fontWeight: 'bold',
  	fontSize: 14,
  },
  subTitle: {
  	color: '#666666',
  },
  text: {
  	color: '#333333',
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