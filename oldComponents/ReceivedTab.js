import React from 'react';
import {Text, View, ListView, StyleSheet} from 'react-native';
import Touchables from '../components/Touchables';
import Styles from '../constants/Styles';

export default class ReceivedTab extends React.Component {
	data = [
		{index: 1, name: 'Mystery', progress: 'In Progress', time: '7:30 PM', image: require('../assets/images/unknown.png'), toScreen: 'CameraNav', style: Styles.i_styles}, 
        {index: 2, name: 'Mystery', progress: 'Unstarted', time: '2 days ago', image: require('../assets/images/unknown.png'), toScreen: 'CameraNav', style: Styles.u_styles}, 
        {index: 3, name: 'Mystery', progress: 'Unstarted', time: '2 days ago', image: require('../assets/images/unknown.png'), toScreen: 'CameraNav', style: Styles.u_styles}, 
        {index: 4, name: 'Dilu', progress: 'Completed', time: '12 days ago', image: require('../assets/images/person3.jpg'), toScreen: 'ViewQuest', style: Styles.c_styles}, 
        ];

	static navigationOptions = {
		tabBarLabel: 'Received'
	}

	constructor() {
	    super();
	    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
	      dataSource: ds.cloneWithRows(this.data),
	    };
  	}

	renderRow(item){
    	const { navigate } = this.props.navigation;
	    return (
	        <Touchables key={item.index} 
	              onClick={() => navigate(item.toScreen)}
	              onLongPress={() => {console.debug("Long press to remove a notification!")}} 
	              hasImage={true} 
	              title={item.name} subTitle={item.progress}
	              text={item.time} styles={item.style} 
	              image={item.image}/>
	      );
  	}


	render() {

		return (
			<ListView
	          enableEmptySections={true}
	          dataSource={this.state.dataSource}
	          renderRow={this.renderRow.bind(this)}
	          rowHeight={100}
	          sectionHeaderHeight={40}
	        />
		)
	}
}
