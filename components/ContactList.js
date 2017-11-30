import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import Touchables from '../components/Touchables';

export default class ContactList extends React.Component {
	/*TODO: make a contact list here*/

	handleClick(){
		//TODO: take to map interface
		Alert.alert("Functionality Not Implemented, sorry!");
	}

	render() {

		/*TODO: make up other users*/
		return (
			<View style={styles.container}>
	        <ScrollView contentContainerStyle={styles.contentContainer}>
	        
        	  <Touchables onClick={() => this.handleClick()} hasImage={true} 
              title='Lily Wang' subTitle='Toronto, ON, Canada'
              text='62 days ago' styles={styles} 
              image={require('../assets/images/lilyP.jpg')}/>

              <Touchables onClick={() => this.handleClick()} hasImage={true} 
              title='Mr. Coin' subTitle='Stanford, CA, USA'
              text='51 days ago' styles={styles} 
              image={require('../assets/images/coin.png')}/>

              <Touchables onClick={() => this.handleClick()} hasImage={true} 
              title='Person A' subTitle='Toronto, ON, Canada'
              text='32 days ago' styles={styles} 
              image={require('../assets/images/lilyP.jpg')}/>

              <Touchables onClick={() => this.handleClick()} hasImage={true} 
              title='Person B' subTitle='Toronto, ON, Canada'
              text='22 days ago' styles={styles} 
              image={require('../assets/images/lilyP.jpg')}/>

              <Touchables onClick={() => this.handleClick()} hasImage={true} 
              title='Person C' subTitle='Toronto, ON, Canada'
              text='17 days ago' styles={styles} 
              image={require('../assets/images/lilyP.jpg')}/>

              <Touchables onClick={() => this.handleClick()} hasImage={true} 
              title='Person D' subTitle='Toronto, ON, Canada'
              text='12 days ago' styles={styles} 
              image={require('../assets/images/lilyP.jpg')}/>

              <Touchables onClick={() => this.handleClick()} hasImage={true} 
              title='Person E' subTitle='Toronto, ON, Canada'
              text='6 days ago' styles={styles} 
              image={require('../assets/images/lilyP.jpg')}/>

              <Touchables onClick={() => this.handleClick()} hasImage={true} 
              title='Person F' subTitle='Toronto, ON, Canada'
              text='2 days ago' styles={styles} 
              image={require('../assets/images/lilyP.jpg')}/>

	        </ScrollView>
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
    backgroundColor: 'rgba(100, 100, 100, 0.2)',
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