import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
// Search bar
import { SearchBar } from 'react-native-elements';

// Colors
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Component imports
import QuestListItem from '../components/Active/QuestListItem';
import utils from '../api/utils';

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
];


export default class NotificationsSent extends React.Component {
	//Hao Wu: removing header here
  state = {
    questsArr: [],
    counter: 0,
  }
   
	static navigationOptions = {
      header: null,
	};

  componentWillMount() {
    this.populateSeNotif();
    this.listener = EventRegister.addEventListener('SentQuest', (data) => {
        this.populateSeNotif();
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  populateSeNotif = async () => {
    console.debug("***Populate sent Notifications***");
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
            if(p[0].startsWith('@SentQuests')){
              let data = JSON.parse(p[1]);
              questsArr.push(
              {
                id: p[0],
                sender: data.sender,
                receiver: data.receiver,
                date: data.date,
                hideout: data.hideout,
                progress: 'unopened',
              });
            }
        });
        var arr_ele_processed = 0;
        questsArr.forEach(
          async (q) => {
            arr_ele_processed++;
            try {
              let help = await AsyncStorage.getItem('@QuestsHelp:' + q.sender + q.date);
              //console.debug(">>>" + help);
              if (help !== null){
                  q.help = JSON.parse(help);
              }
            } catch (error) {
            // Error retrieving data
            }
            if(arr_ele_processed === questsArr.length){
              console.debug("Setting states");
              this.setState({counter: this.state.counter + 1});
            }
        });
        this.setState({questsArr: questsArr});
      }
    } catch (error) {
      console.debug(error);
    }
  }

	render() {
		const { navigate } = this.props.navigation;
    console.debug("Render sent tab");
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
            		keyExtractor={item => item.receiver}  // Key is concatenation of name, date, image url
            		renderItem={({ item }) => (
            			<QuestListItem name={item.receiver} date={utils.timeDiffOutput(Date.now(), item.date)} 
            				image={item.image} progress={item.progress} received={false}
                    isNew={!!item.help && item.help.new}
            				onPress={() => {
                      for(let i = 0; i < this.state.questsArr.length; i++){
                        if(this.state.questsArr[i].id === item.id){
                          if(item.help && item.help.new){
                            this.state.questsArr[i].help.new = false;
                            this.setState({counter: this.state.counter + 1});
                            //Hao: ^change key to trigger re-render, this trick took me 3 hours to find
                            AsyncStorage.mergeItem('@QuestsHelp:' + item.sender + item.date, 
                              JSON.stringify({new: false}), 
                              () => {navigate('Monitor', {cur_location: item.help.cur_location, hideout: item.hideout, requestText: item.help.requestText});});
                          }else{
                            navigate('Monitor', {cur_location: {coords: {latitude: 37.4268463, longitude: -122.1658255}}, hideout: item.hideout});
                          }
                          break;
                        }
                      }
                    } 
                  }/>
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
