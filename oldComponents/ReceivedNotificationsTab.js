import React from 'react';
import {Text, View, ScrollView} from 'react-native';

// Component imports
import ReceivedQuestLink from './ReceivedQuestLink';


export default class ReceivedTab extends React.Component {

	static navigationOptions = {
		tabBarLabel: 'Received'
	}


	render() {

		return (
			<ScrollView> 
				<View>

					<ReceivedQuestLink name='Parker' date='9:30 AM' image={require('../../assets/images/profileImages/man1.png')} progress='in progress' message="What's up?" color='yellow'/>
					<ReceivedQuestLink name='Grace' date='1 day ago' image={require('../../assets/images/profileImages/woman1.png')} progress='unstarted' message='Long time no see' color='red'/>
					<ReceivedQuestLink name='Cooper' date='2 days ago' image={require('../../assets/images/profileImages/man2.png')} progress='completed' message='Have fun!' color='green'/>
					<ReceivedQuestLink name='Nolan' date='4 days ago' image={require('../../assets/images/profileImages/man3.png')} progress='completed' message='I miss you' color='green'/>
					<ReceivedQuestLink name='Victoria' date='1 week ago' image={require('../../assets/images/profileImages/woman2.png')} progress='completed' message='Complete my Quest!' color='green'/>
					<ReceivedQuestLink name='Zoey' date='2 months ago' image={require('../../assets/images/profileImages/woman3.png')} progress='completed' message='Hello there' color='green'/>
					<ReceivedQuestLink name='Jonny' date='2 months ago' image={require('../../assets/images/profileImages/man4.png')} progress='completed' message='Hi there' color='green'/>
					<ReceivedQuestLink name='Alex' date='3 months ago' image={require('../../assets/images/profileImages/man5.png')} progress='completed' message='What are you up to?' color='green'/>
					<ReceivedQuestLink name='Alison' date='5 months ago' image={require('../../assets/images/profileImages/woman4.png')} progress='completed' message='Have a good day!' color='green'/>
					<ReceivedQuestLink name='Julia' date='1 year ago' image={require('../../assets/images/profileImages/woman5.png')} progress='completed' message='Complete my Quest!' color='green'/>
					<ReceivedQuestLink name='Lily' date='1 year ago' image={require('../../assets/images/profileImages/woman6.png')} progress='completed' message="How's sf?" color='green'/>
					<ReceivedQuestLink name='Quinn' date='1 year ago' image={require('../../assets/images/profileImages/man6.png')} progress='completed' message='Hello there' color='green'/>

         		</View>
			</ScrollView>
		)
	}
}