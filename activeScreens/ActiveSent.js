import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

// Search bar
import { SearchBar } from 'react-native-elements';

// Colors
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Component imports
import QuestListItem from '../components/Active/QuestListItem';


const questsArr = [
	{
	    name: 'Grace', 
	    nameSize: Fonts.sentNameFontSize,
	    date: 'Sent at 9:35 AM', 
	    image: require('../assets/images/profileImages/woman1.png'),
	    progress: 'in progress',
	    received: false,
	},
    {
    	name: 'Cole', 
   		nameSize: Fonts.sentNameFontSize,
    	date: 'Sent 1 week ago', 
    	image: require('../assets/images/profileImages/man4.png'),
    	progress: 'unopened',
    	received: false,
    },
	{
	    name: 'Jon', 
	   	nameSize: Fonts.sentNameFontSize,
	    date: 'Sent 1 weeks ago', 
	    image: require('../assets/images/profileImages/man7.png'),
	    progress: 'unopened',
	    received: false,
	},
	// {
	//     name: 'Austin', 
	//     date: 'Completed 1 month ago', 
	//     image: require('../assets/images/profileImages/man8.png'),
	//     progress: 'completed',
	//     received: false,
	// },
	// {
	//     name: 'Alison', 
	//     date: 'Completed 1 year ago', 
	//     image: require('../assets/images/profileImages/woman5.png'),
	//     progress: 'completed',
	//     received: false,
	// },
	// {
	//     name: 'Samantha', 
	//     date: 'Completed 1 year ago', 
	//     image: require('../assets/images/profileImages/woman6.png'),
	//     progress: 'completed',
	//     received: false,
	// },
	// {
	//     name: 'George', 
	//     date: 'Completed 1 year ago', 
	//     image: require('../assets/images/profileImages/man9.png'),
	//     progress: 'completed',
	//     received: false,
	// },
];


export default class NotificationsSent extends React.Component {
	//Hao Wu: removing header here 
	static navigationOptions = {
      header: null,
  	};

	static navigationOptions = {
    	header: null,
  	};

	render() {
		const { navigate } = this.props.navigation;

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
            			<QuestListItem name={item.name} nameSize={item.nameSize} date={item.date} 
            				image={item.image} progress={item.progress} received={item.received}
            				onPress={() => {if(item.received) {navigate('CameraNav', {has_ghost: item.has_ghost, indoor: item.indoor, goal: item.goal});} }}/>
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
