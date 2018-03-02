import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerTintColor: Colors.tintColor,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          
          <View style={styles.rowStyle}>
          <TouchableOpacity style={styles.receivedQuest, styles.smallTile} onPress={() => navigate('ViewQuest')}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/me.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Person E, 2 days ago</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.receivedQuest, styles.mediumTile} onPress={() => navigate('ViewQuest')}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/letter.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Person D, 6 days ago</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.rowStyle}>
          <TouchableOpacity style={styles.receivedQuest, styles.mediumTile} onPress={() => navigate('ViewQuest')}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/mother.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Person C, 12 days ago</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.receivedQuest, styles.smallTile} onPress={() => navigate('ViewQuest')}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/fish.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Person B, 17 days ago</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.rowStyle}>
          <TouchableOpacity style={styles.receivedQuest, styles.bigTile} onPress={() => navigate('ViewQuest')}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/landscape.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Person A, 32 days ago</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.rowStyle}>
          <TouchableOpacity style={styles.receivedQuest, styles.mediumTile} onPress={() => navigate('ViewQuest')}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/me.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Mr Coin, 51 days ago</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.receivedQuest, styles.smallTile} onPress={() => navigate('ViewQuest')}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/me.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Lily Wang, 62 days ago</Text>
          </TouchableOpacity>
          </View>

        </ScrollView>
        <View style={[styles.overlay]} />
      </View>
    );
  }

}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexWrap: 'wrap',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: 'white',
    width: null,
    height: null
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowStyle: {
    flexDirection: 'row',
    height: 200,
  },
  contentContainer: {
    flexWrap: 'wrap',
  },
  receivedQuest: {
    backgroundColor: '#cccccc',
  },
  questInfo: {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
  },
  questImg: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  smallTile: {
    width: '40%',
  },
  mediumTile: {
    width: '60%',
  },
  bigTile: {
    width: '100%',
  },
});

const blur = {blurRadius: 0};
