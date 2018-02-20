import React from 'react';
import {Text, View, ScrollView} from 'react-native';

// Component imports
import SentQuestLink from './SentQuestLink';

export default class SentTab extends React.Component {


	static navigationOptions = {
		tabBarLabel: 'Sent'
	}

	render() {

		return (
			<ScrollView> 
				<View>
					<SentQuestLink name='Jonny' date='7:30 PM' image={require('../../assets/images/profileImages/man7.png')} progress='in progress' message='Hi there' color='yellow'/>
					<SentQuestLink name='Alex' date='2 days ago' image={require('../../assets/images/profileImages/man5.png')} progress='unstarted' message='What are you up to?' color='red'/>
					<SentQuestLink name='Alison' date='3 days ago' image={require('../../assets/images/profileImages/woman4.png')} progress='unstarted' message='Have a good day!' color='red'/>
					<SentQuestLink name='Julia' date='1 week ago' image={require('../../assets/images/profileImages/woman5.png')} progress='completed' message='Complete my Quest!' color='green'/>
					<SentQuestLink name='Lily' date='1 week ago' image={require('../../assets/images/profileImages/woman6.png')} progress='completed' message="How's sf?" color='green'/>
					<SentQuestLink name='Quinn' date='1 month ago' image={require('../../assets/images/profileImages/man6.png')} progress='completed' message='Hello there' color='green'/>
					<SentQuestLink name='Avery' date='2 months ago' image={require('../../assets/images/profileImages/woman7.png')} progress='completed' message="What's up?" color='green'/>
					<SentQuestLink name='Chloe' date='2 months ago' image={require('../../assets/images/profileImages/woman8.png')} progress='completed' message='Long time no see' color='green'/>
					<SentQuestLink name='Easton' date='3 months ago' image={require('../../assets/images/profileImages/man8.png')} progress='completed' message='Have fun!' color='green'/>
					<SentQuestLink name='Blake' date='4 months ago' image={require('../../assets/images/profileImages/man9.png')} progress='completed' message='I miss you' color='green'/>
					<SentQuestLink name='Ella' date='1 year ago' image={require('../../assets/images/profileImages/woman9.png')} progress='completed' message='Complete my Quest!' color='green'/>
					<SentQuestLink name='Alex' date='2 years ago' image={require('../../assets/images/profileImages/man5.png')} progress='completed' message='Hello there' color='green'/>
         		</View>
			</ScrollView>
		)
	}
}