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

import { MonoText } from '../components/StyledText';

export default class Inbox extends React.Component {
  static navigationOptions = {
    title: 'Inbox',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          
          <View style={styles.rowStyle}>
          <View style={styles.receivedQuest, styles.smallTile}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/me.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Get started by opening</Text>
          </View>

          <View style={styles.receivedQuest, styles.mediumTile}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/letter.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Get started by opening</Text>
          </View>
          </View>

          <View style={styles.rowStyle}>
          <View style={styles.receivedQuest, styles.mediumTile}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/mother.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Get started by opening</Text>
          </View>

          <View style={styles.receivedQuest, styles.smallTile}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/fish.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Get started by opening</Text>
          </View>
          </View>

          <View style={styles.rowStyle}>
          <View style={styles.receivedQuest, styles.bigTile}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/landscape.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Get started by opening</Text>
          </View>
          </View>

          <View style={styles.rowStyle}>
          <View style={styles.receivedQuest, styles.mediumTile}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/me.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Get started by opening</Text>
          </View>

          <View style={styles.receivedQuest, styles.smallTile}>
            <Image resizeMode='cover' blurRadius={blur.blurRadius}
              source={require('../assets/images/me.jpg')}
              style={styles.questImg}
            />
            <Text style={styles.questInfo}>Get started by opening</Text>
          </View>
          </View>

        </ScrollView>
      </View>
    );
  }

}
const styles = StyleSheet.create({
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
