import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

// Search bar
import { SearchBar } from 'react-native-elements';

// Colors
import Colors from '../constants/Colors';

// Component imports
import QuestListItem from '../components/Notifications/QuestListItem';


const questsArr = [
	{
	    name: 'Your class mate', 
	    date: 'Received at 10:01 AM',
	    image: require('../assets/images/profileImages/woman7.png'),
	    progress: 'in progress',
	    received: true,
	    has_ghost: false, indoor: true, goal: 'portal',
	},
	{
	    name: 'You met at a bar', 
	    date: 'Received 1 day ago', 
	    image: require('../assets/images/profileImages/man2.png'),
	    progress: 'unopened',
	    received: true,
	    has_ghost: true, indoor: false, goal: 'gift',
    },
    {
    	name: 'High school Friends', 
    	date: 'Received 2 days ago',
    	image: require('../assets/images/profileImages/woman2.png'),
    	progress: 'unopened',
    	received: true,
    },
];


export default class NotificationsReceived extends React.Component {
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
            			<QuestListItem name={item.name} date={item.date} 
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
