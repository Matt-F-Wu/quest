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
    headerLeft: <Icon name={'md-close-circle'} size={32} style={{padding: 10, marginLeft: 10, color: Colors.tintColor,}}
                            onPress={ () => { navigation.navigate('Gallery') }} />,
  });

  render() {
  	const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image resizeMode='cover' blurRadius={blur.blurRadius}
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
			  onPress={() => navigate('Compose')}
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
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  buttonContainer: {
  	width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
  	backgroundColor: Colors.tintColor,
  	color: 'white',
  	fontSize: 16,
  	fontWeight: 'bold',
  	padding: 20,
  }
});

const blur = {blurRadius: 0};
