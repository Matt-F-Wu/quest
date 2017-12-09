import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { MonoText } from '../components/StyledText';

export default class ViewQuest extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'View Quest',
    headerTintColor: Colors.tintColor,
    headerLeft: <Icon name={'md-close-circle'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => { navigation.navigate('Gallery') }} />,
  });

  render() {
  	const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image resizeMode='contain' blurRadius={blur.blurRadius}
          source={require('../assets/images/quest1.jpg')}
          style={styles.questImg}
        />
        <Text style={styles.questInfo}>
        Look who I took out for a walk. it's our kitten! He missed you too.
        </Text>
        <View style={styles.buttonContainer}>
	        <Button
	          style={styles.button}
    			  onPress={() => navigate('Compose')}
    			  title="Home"
    			  color={Colors.tintColor}
    			  accessibilityLabel="Return to Home"
    			/>
    			<Button
    			  style={styles.button}
    			  onPress={() => navigate('SelectLocation', {index: 1, name: 'Linda Fang', location: 'Toronto, ON, Canada', time: '1 day ago', image: require('../assets/images/lilyP.jpg')})}
    			  title="Reply"
    			  color={Colors.tintColor}
    			  accessibilityLabel="Reply to this Quest"
    			/>
		</View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questInfo: {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    fontSize: 24,
    margin: 5,
  },
  questImg: {
    flex: 1,
  },
  buttonContainer: {
  	width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  button: {
    width: '50%',
  	color: Colors.tintColor,
  	fontSize: 16,
  	fontWeight: 'bold',
  	padding: 20,
  }
});

const blur = {blurRadius: 0};
