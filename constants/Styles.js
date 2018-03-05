import {StyleSheet} from 'react-native';
import Colors from './Colors';

const u_styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
    borderBottomColor: Colors.tintColor,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flexWrap: 'wrap',
  },
  cardStyle: {
  	opacity: 0.0,
  },
  imageContainer: {
  	width: 120,
  	height: 120,
  },
  contactImg: {
  	width: 100,
  	height: 100,
  	borderRadius: 50,
  	borderWidth: 4,
    borderColor: 'transparent',
  },
});

const s_styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
    borderBottomColor: '#333333',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flexWrap: 'wrap',
  },
  cardStyle: {
    opacity: 0.0,
  },
  imageContainer: {
    width: 108,
    height: 108,
  },
  contactImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.tintColor,
  },
});

const floating_text = {
  color: Colors.tintColor, 
  backgroundColor: Colors.textBGBlur, 
  marginTop: '5%', 
  fontWeight: 'bold',  
  fontSize: 14,
  textAlign: 'center',
  textAlignVertical: 'center',
};

export default {
  u_styles: u_styles,
  s_styles: s_styles,
  floating_text: floating_text
};