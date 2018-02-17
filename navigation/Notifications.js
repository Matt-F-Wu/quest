import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';

// Search bar
import { SearchBar } from 'react-native-elements';

// Colors
import Colors from '../constants/Colors';

// Component imports
import QuestListItem from '../components/Notifications/QuestListItem';


const questsArr = [
	{
	    name: 'Nicole', 
	    date: 'Received at 10:01 AM',
	    image: require('../assets/images/profileImages/woman7.png'),
	    progress: 'unopened',
	},
	{
	    name: 'Grace', 
	    date: 'Sent at 9:35 AM', 
	    image: require('../assets/images/profileImages/woman1.png'),
	    progress: 'unopened',
	},
	{
	    name: 'Cooper', 
	    date: 'Received 1 day ago', 
	    image: require('../assets/images/profileImages/man2.png'),
	    progress: 'unopened',
    },
    {
    	name: 'Katie', 
    	date: 'Completed 4 days ago',
    	image: require('../assets/images/profileImages/woman2.png'),
    	progress: 'completed',
    },
    {
    	name: 'Ian', 
    	date: 'Completed 5 days ago', 
    	image: require('../assets/images/profileImages/man3.png'),
    	progress: 'completed',
    },
    {
    	name: 'Cole', 
    	date: 'Completed 1 week ago', 
    	image: require('../assets/images/profileImages/man4.png'),
    	progress: 'completed',
    },
    {
	    name: 'Hao', 
	    date: 'Completed 1 week ago', 
	    image: require('../assets/images/profileImages/man5.png'),
	    progress: 'completed',
	},
    {
	    name: 'Alejandrina', 
	    date: 'Completed 2 weeks ago', 
	    image: require('../assets/images/profileImages/woman3.png'),
	    progress: 'completed',
	},
	{
	    name: 'Bob', 
	    date: 'Completed 3 weeks ago', 
	    image: require('../assets/images/profileImages/man6.png'),
	    progress: 'completed',
	},
	{
	    name: 'Jon', 
	    date: 'Completed 3 weeks ago', 
	    image: require('../assets/images/profileImages/man7.png'),
	    progress: 'completed',
	},
	{
	    name: 'Austin', 
	    date: 'Completed 1 month ago', 
	    image: require('../assets/images/profileImages/man8.png'),
	    progress: 'completed',
	},
	{
	    name: 'Lily', 
	    date: 'Completed 2 months ago', 
	    image: require('../assets/images/profileImages/woman4.png'),
	    progress: 'completed',
	},
	{
	    name: 'Alison', 
	    date: 'Completed 1 year ago', 
	    image: require('../assets/images/profileImages/woman5.png'),
	    progress: 'completed',
	},
	{
	    name: 'Samantha', 
	    date: 'Completed 1 year ago', 
	    image: require('../assets/images/profileImages/woman6.png'),
	    progress: 'completed',
	},
	{
	    name: 'George', 
	    date: 'Completed 1 year ago', 
	    image: require('../assets/images/profileImages/man9.png'),
	    progress: 'completed',
	},
];


export default class Notifications extends React.Component {

	render() {

		return (

			<View style={styles.container}>
				<SearchBar
					round
					// lightTheme
					containerStyle={styles.searchBarStyle}
					placeholder='Recent Quests' 
				/>

          		<FlatList contentContainerStyle={styles.contentContainer}
            		data={questsArr}
            		numColumns={1}
            		keyExtractor={item => item.name}  // Key is concatenation of name, date, image url
            		renderItem={({ item }) => (
            			<QuestListItem name={item.name} date={item.date} image={item.image} progress={item.progress} />
            		)}
          		/>
			</View>
		)
	}
}


const styles = StyleSheet.create({
  	container: {
    	height: '100%',
    	backgroundColor: Colors.backgroundColor,
  	},

  	searchBarStyle: {
    	top: 20,
    	zIndex: 2,
    	backgroundColor: Colors.backgroundColor, 
    	borderBottomColor: 'transparent', 
    	borderTopColor: 'transparent'
  	},

  	contentContainer: {
    	backgroundColor: 'transparent',
    	paddingTop: 20,
    	zIndex: 1,
  	},
});