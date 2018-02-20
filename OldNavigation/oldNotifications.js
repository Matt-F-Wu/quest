import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

// Search bar
import { SearchBar } from 'react-native-elements';

// Component imports
import QuestLink from '../components/Notifications/QuestLink';


export default class Notifications extends React.Component {

	render() {

		return (

			<View style={styles.container}>
				<SearchBar
					round
					lightTheme
					containerStyle={styles.searchBarStyle}
					placeholder='Current Quests' 
				/>

				<ScrollView contentContainerStyle={styles.contentContainer}>
					<View>

						<QuestLink name='Parker' date='9:30 AM' image={require('../assets/images/profileImages/man1.png')} progress='in progress' message="What's up?" color='yellow' />
						<QuestLink name='Grace' date='1 day ago' image={require('../assets/images/profileImages/woman1.png')} progress='unstarted' message='Long time no see' color='red'/>
						<QuestLink name='Cooper' date='2 days ago' image={require('../assets/images/profileImages/man2.png')} progress='completed' message='Have fun!' color='green'/>
						<QuestLink name='Nolan' date='4 days ago' image={require('../assets/images/profileImages/man3.png')} progress='completed' message='I miss you' color='green'/>
						<QuestLink name='Victoria' date='1 week ago' image={require('../assets/images/profileImages/woman2.png')} progress='completed' message='Complete my Quest!' color='green'/>
						<QuestLink name='Zoey' date='2 months ago' image={require('../assets/images/profileImages/woman3.png')} progress='completed' message='Hello there' color='green'/>
						<QuestLink name='Jonny' date='2 months ago' image={require('../assets/images/profileImages/man4.png')} progress='completed' message='Hi there' color='green'/>
						<QuestLink name='Alex' date='3 months ago' image={require('../assets/images/profileImages/man5.png')} progress='completed' message='What are you up to?' color='green'/>
						<QuestLink name='Alison' date='5 months ago' image={require('../assets/images/profileImages/woman4.png')} progress='completed' message='Have a good day!' color='green'/>
						<QuestLink name='Julia' date='1 year ago' image={require('../assets/images/profileImages/woman5.png')} progress='completed' message='Complete my Quest!' color='green'/>
						<QuestLink name='Lily' date='1 year ago' image={require('../assets/images/profileImages/woman6.png')} progress='completed' message="How's sf?" color='green'/>
						<QuestLink name='Quinn' date='1 year ago' image={require('../assets/images/profileImages/man6.png')} progress='completed' message='Hello there' color='green'/>

	         		</View>
				</ScrollView>
			</View>
		)
	}
}


const styles = StyleSheet.create({
  	container: {
    	height: '100%',
    	backgroundColor: 'white',
  	},

  	searchBarStyle: {
    	top: 20,
    	zIndex: 2,
    	backgroundColor: 'white', 
    	borderBottomColor: 'transparent', 
    	borderTopColor: 'transparent'
  	},

  	contentContainer: {
    	flexWrap: 'wrap',
    	backgroundColor: 'transparent',
    	paddingTop: 20,
    	zIndex: 1,
  	},

  	// headerStyle: {
   //  	top: 20,
   //  	zIndex: 3,
   //  	backgroundColor: 'transparent',
  	// },

  	// headerFontStyle: {
   //  	color: 'orange',
   //  	textAlign: 'center',
   //  	fontSize: 32,
  	// },

});