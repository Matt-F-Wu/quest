import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
// Search bar
import { SearchBar } from 'react-native-elements';

// Colors
import Colors from '../constants/Colors';

// Component imports
import QuestListItem from '../components/Notifications/QuestListItem';
import utils from '../api/utils';

var refresh = false;
const questsArrBase = [
	{
      id: 0,
      key: '00',
	    name: 'Your class mate', 
	    date: 'Received at 10:01 AM',
	    progress: 'in progress',
	    received: true,
	    has_ghost: false, indoor: true, goal: 'portal',
	},
	{
      id: 1,
      key: '01',
	    name: 'You met at a bar', 
	    date: 'Received 1 day ago', 
	    progress: 'unopened',
	    received: true,
	    has_ghost: true, indoor: false, goal: 'gift',
  },
  {
      id: 2,
      key: '02',
    	name: 'High school friends', 
    	date: 'Received 2 days ago',
    	progress: 'unopened',
    	received: true,
  },
];


export default class NotificationsReceived extends React.Component {
	//Hao Wu: removing header here
  state = {
    questsArr: [],
    counter: 0,
  }

	static navigationOptions = ({navigation}) =>({
    header: null,
  });

  componentWillMount() {
    this.populateReNotif();
    this.listener = EventRegister.addEventListener('ReceivedQuest', (data) => {
        this.populateReNotif();
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  populateReNotif = async () => {
    console.debug("***Populate Received Notifications***");
    //clear old and repopulate
    let questsArr = [];
    //questsArrBase.forEach((p) => questsArr.push(p));
    try {
      let keys = await AsyncStorage.getAllKeys();
      let pairs = await AsyncStorage.multiGet(keys);
      if (pairs !== null){
        // We have data!!
        pairs.forEach(
          (p) => {
            if(p[0].startsWith('@ReceivedQuests')){
              let data = JSON.parse(p[1]);
              questsArr.push(
              {
                id: p[0],
                rawDate: data.date,
                name: data.hintText || 'Mystery',
                sender: data.sender, 
                date: utils.timeDiffOutput(Date.now(), data.timestamp), 
                progress: data.progress || 'unopened', 
                received: true, 
                has_ghost: !!data.adv,
                indoor: data.indoor,
                nav: data.nav,
                adv: data.adv,
                goal: data.goal,
                captionText: data.captionText,
              });
              //console.debug("Pushed...");
            }
        });
        this.setState({questsArr: questsArr});
      }
    } catch (error) {
      console.debug(error);
    }
  }

	render() {
    //console.debug(this.state.questsArr);
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<SearchBar
					round
					// lightTheme
					containerStyle={styles.searchBarStyle}
					placeholder='Recent Quests' 
				/>

      		<FlatList
            key={this.state.counter}
            contentContainerStyle={styles.contentContainer}
        		data={this.state.questsArr}
        		numColumns={1}
        		keyExtractor={item => item.id}  // Key is concatenation of name, date, image url
        		renderItem={({ item }) => (
        			<QuestListItem name={item.name} date={item.date} 
        				image={item.image} progress={item.progress} received={item.received}
        				onPress={() => {
                  if(item.received) {
                    let n_qA = this.state.questsArr.map((q) => {if(q.id === item.id){q.progress = 'in progress';} return q;});
                    this.setState({questsArr: n_qA, counter: this.state.counter + 1});
                    //Hao: ^change key to trigger re-render, this trick took me 3 hours to find
                    
                    AsyncStorage.mergeItem(item.id, 
                      JSON.stringify({progress: 'in progress'}), 
                      () => {navigate('CameraNav', {has_ghost: item.has_ghost, indoor: item.indoor, goal: item.goal, sender: item.sender, key: item.sender + item.rawDate});});
                    
                  } 
                } }/>
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
