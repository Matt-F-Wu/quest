import React from 'react';
import {
  View,
  Image,
  Text,
  Alert,
  StyleSheet,
  ListView
} from 'react-native';
import { MapView } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {RkButton} from 'react-native-ui-kitten';

// Constant imports
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import Touchables from '../components/Touchables';

const username = 'HaoWu';
const PUSH_ENDPOINT = 'https://quest-back-end.herokuapp.com/sendq/';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var self;
var selected = {
  nav: 'coin',
  adv: undefined,
  goal: 'gift'};

export default class CustomizeGame extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Design the Game',
    headerLeft: (
      <Icon2 name={'chevron-left'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => navigation.goBack() } />
      ),
    headerRight: (
      <Icon name={'md-close-circle'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => {navigation.popToTop(); navigation.state.params.main_remount({ mountCam: true });} } />
      ),
  });

  state = {
    navData: [
        {
          cate: 'nav', 
          index: 1,
          image: require('../assets/images/coin.png'),
          selected: true,
        },
        {
          cate: 'nav', 
          index: 2,
          image: require('../assets/images/emoji-fire.png'),
          selected: false,
        },
        {
          cate: 'nav',
          index: 3, 
          image: require('../assets/images/emoji-heart.png'),
          selected: false,
        },
        {
          cate: 'nav',
          index: 4, 
          image: require('../assets/images/emoji-heart-eyes.png'),
          selected: false,
        },
      ],

  advData: [
        {
          cate: 'adv', 
          index: 1,
          image: require('../assets/images/none.png'),
          selected: true,
        },
        {
          cate: 'adv', 
          index: 2,
          image: require('../assets/images/ghost.png'),
          selected: false,
        },
        {
          cate: 'adv', 
          index: 3,
          image: require('../assets/images/monster.png'),
          selected: false,
        },
        {
          cate: 'adv',
          index: 4, 
          image: require('../assets/images/fox.jpg'),
          selected: false,
        },
      ],

  goalData: [
        {
          cate: 'goal', 
          index: 1, 
          image: require('../assets/textures/quest-present-top-bottom.png'),
          selected: true,
        },
        {
          cate: 'goal', 
          index: 2,
          image: require('../assets/textures/portal.jpg'),
          selected: false,
        },
        {
          cate: 'goal',
          index: 3, 
          image: require('../assets/textures/crate.gif'),
          selected: false,
        },
      ]
    };

  constructor(props) {
    super(props);
    self = this;
  }

  componentWillMount(){
    //console.debug("About to set state!");
    this.setState({
      navObjSource: ds.cloneWithRows(this.state.navData),
      advObjSource: ds.cloneWithRows(this.state.advData),
      goalObjSource: ds.cloneWithRows(this.state.goalData),
    });
    //console.debug("Now: " + this.state.advObjSource);
  }

  setValues(key, value, index){
    selected[key] = value;
    for(let i = 0; i < this.state[key + "Data"].length; i++){
      if(this.state[key + "Data"][i].index == index){
        this.state[key + "Data"][i].selected = true;
        console.debug(this.state[key + "Data"][i]);
      }else{
        this.state[key + "Data"][i].selected = false;
      }
    }
    if(key == 'nav'){
      this.setState({navObjSource: ds.cloneWithRows(this.state[key + "Data"])});
    }else if(key == "adv"){
      this.setState({advObjSource: ds.cloneWithRows(this.state[key + "Data"])});
    }else{
      this.setState({goalObjSource: ds.cloneWithRows(this.state[key + "Data"])});
    }
    console.debug("Select item");
  }

  renderRow = (item) => {
    return (
      <Touchables key={item.index} 
        onClick={() => {this.setValues(item.cate, item.value, item.index);}}
        hasImage={true} 
        title={""} subTitle={""}
        text={""} styles={item.selected? Styles.s_styles : Styles.u_styles} 
        image={item.image}/>
      );
  }

  sendQuest(indoor){
    let params = this.props.navigation.state.params;
    fetch(PUSH_ENDPOINT + username, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          value: 'A wonderful message',
          indoor: params.indoor,
          hideout: params.hideout,
          nav: selected.nav,
          adv: selected.adv,
          goal: selected.goal,
        },
      }),
    });
    const { navigate } = this.props.navigation;
    Alert.alert("Quest sent successfully!");

    self.props.navigation.popToTop();
    self.props.navigation.state.params.main_remount({ mountCam: true });
  }

  sendQuestWrapper(){
    Alert.alert("Skipping this step will send an Indoor Quest!", "aka a game to play at home",
        [
          {text: 'Cancel', onPress: () => console.log('Not Skipping'), style: 'cancel'},
          {text: 'OK', onPress: () => {this.sendQuest(true)} },
        ]
      );
  }

  render() {
    console.debug("Render...");

    return (
      <View style={{ flex: 1 }}>
      <Text style={styles.titleText}>Choose Navigation Theme:</Text>
      <View style={{height: 120}}>
      <ListView horizontal={true} 
        dataSource={this.state.navObjSource}
        renderRow={this.renderRow}
        removeClippedSubviews={false}
      />
      </View>
      <Text style={styles.titleText}>Choose Adversaries:</Text>
      <View style={{height: 120}}>
      <ListView horizontal={true}
        dataSource={this.state.advObjSource}
        renderRow={this.renderRow}
        removeClippedSubviews={false}
      />
      </View>
      <Text style={styles.titleText}>Choose Gift Wrap:</Text>
      <View style={{height: 120}}>
      <ListView horizontal={true}
        dataSource={this.state.goalObjSource}
        renderRow={this.renderRow}
        removeClippedSubviews={false}
      />
      </View>
      <RkButton onPress={() => this.sendQuest()} 
          style={[{position: 'absolute', left: '40%', top: '90%', width: '20%', height: '8%', marginBottom: '2%',}, styles.button]} >
          <FIcon name={'check'} color='#ffffff' size={30} />
      </RkButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.tintColor,
    borderRadius: 40,
  },
  titleText: {
    color: Colors.tintColor,
    fontWeight: 'bold',  
    fontSize: 16,
    margin: 10,
  }
});