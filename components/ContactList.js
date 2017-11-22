import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class ContactList extends React.Component {
	/*TODO: make a contact list here*/
	render() {

		/*TODO: make up other users*/
		return (
			<View style={styles.container}>
	        <ScrollView contentContainerStyle={styles.contentContainer}>
	        
	        <View style={styles.rowStyle}>
	        	<View style={styles.imageContainer}>
		        	<Image resizeMode='cover'
		              source={require('../assets/images/lilyP.jpg')}
		              style={styles.contactImg}
		            />
	            </View>
	        	<View style={styles.cardStyle}>
		        	<Text style={styles.contactName}>Lily Wang</Text>
		        	<Text style={styles.location}>Toronto, ON, Canada</Text>
		        	<Text style={styles.lastInteraction}>62 days ago</Text>
	        	</View>
	        </View>

	        <View style={styles.rowStyle}>
	        	<View style={styles.imageContainer}>
		        	<Image resizeMode='cover'
		              source={require('../assets/images/lilyP.jpg')}
		              style={styles.contactImg}
		            />
	            </View>
	        	<View style={styles.cardStyle}>
		        	<Text style={styles.contactName}>Lily Wang</Text>
		        	<Text style={styles.location}>Toronto, ON, Canada</Text>
		        	<Text style={styles.lastInteraction}>62 days ago</Text>
	        	</View>
	        </View>

	        <View style={styles.rowStyle}>
	        	<View style={styles.imageContainer}>
		        	<Image resizeMode='cover'
		              source={require('../assets/images/lilyP.jpg')}
		              style={styles.contactImg}
		            />
	            </View>
	        	<View style={styles.cardStyle}>
		        	<Text style={styles.contactName}>Lily Wang</Text>
		        	<Text style={styles.location}>Toronto, ON, Canada</Text>
		        	<Text style={styles.lastInteraction}>62 days ago</Text>
	        	</View>
	        </View>

	        <View style={styles.rowStyle}>
	        	<View style={styles.imageContainer}>
		        	<Image resizeMode='cover'
		              source={require('../assets/images/lilyP.jpg')}
		              style={styles.contactImg}
		            />
	            </View>
	        	<View style={styles.cardStyle}>
		        	<Text style={styles.contactName}>Lily Wang</Text>
		        	<Text style={styles.location}>Toronto, ON, Canada</Text>
		        	<Text style={styles.lastInteraction}>62 days ago</Text>
	        	</View>
	        </View>

	        <View style={styles.rowStyle}>
	        	<View style={styles.imageContainer}>
		        	<Image resizeMode='cover'
		              source={require('../assets/images/lilyP.jpg')}
		              style={styles.contactImg}
		            />
	            </View>
	        	<View style={styles.cardStyle}>
		        	<Text style={styles.contactName}>Lily Wang</Text>
		        	<Text style={styles.location}>Toronto, ON, Canada</Text>
		        	<Text style={styles.lastInteraction}>62 days ago</Text>
	        	</View>
	        </View>

	        <View style={styles.rowStyle}>
	        	<View style={styles.imageContainer}>
		        	<Image resizeMode='cover'
		              source={require('../assets/images/lilyP.jpg')}
		              style={styles.contactImg}
		            />
	            </View>
	        	<View style={styles.cardStyle}>
		        	<Text style={styles.contactName}>Lily Wang</Text>
		        	<Text style={styles.location}>Toronto, ON, Canada</Text>
		        	<Text style={styles.lastInteraction}>62 days ago</Text>
	        	</View>
	        </View>

	        <View style={styles.rowStyle}>
	        	<View style={styles.imageContainer}>
		        	<Image resizeMode='cover'
		              source={require('../assets/images/lilyP.jpg')}
		              style={styles.contactImg}
		            />
	            </View>
	        	<View style={styles.cardStyle}>
		        	<Text style={styles.contactName}>Lily Wang</Text>
		        	<Text style={styles.location}>Toronto, ON, Canada</Text>
		        	<Text style={styles.lastInteraction}>62 days ago</Text>
	        	</View>
	        </View>

	        <View style={styles.rowStyle}>
	        	<View style={styles.imageContainer}>
		        	<Image resizeMode='cover'
		              source={require('../assets/images/lilyP.jpg')}
		              style={styles.contactImg}
		            />
	            </View>
	        	<View style={styles.cardStyle}>
		        	<Text style={styles.contactName}>Lily Wang</Text>
		        	<Text style={styles.location}>Toronto, ON, Canada</Text>
		        	<Text style={styles.lastInteraction}>62 days ago</Text>
	        	</View>
	        </View>

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
  contactName: {
  	color: 'orange',
  	fontWeight: 'bold',
  	fontSize: 14,
  },
  location: {
  	color: '#666666',
  },
  lastInteraction: {
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