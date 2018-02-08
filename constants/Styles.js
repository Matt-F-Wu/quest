import {StyleSheet} from 'react-native';

const i_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  	flexDirection: 'column',
  	marginLeft: 20,
  },
  title: {
  	color: 'black',
  	fontWeight: 'bold',
  	fontSize: 14,
  },
  subTitle: {
  	color: 'red',
  },
  text: {
  	color: '#333333',
  },
  imageContainer: {
  	width: 80,
  	height: 80,
  },
  contactImg: {
  	width: 80,
  	height: 80,
  	borderRadius: 40,
  	borderWidth: 4,
    borderColor: 'red',
  },
});

const u_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  	flexDirection: 'column',
  	marginLeft: 20,
  },
  title: {
  	color: 'black',
  	fontWeight: 'bold',
  	fontSize: 14,
  },
  subTitle: {
  	color: 'orange',
  },
  text: {
  	color: '#333333',
  },
  imageContainer: {
  	width: 80,
  	height: 80,
  },
  contactImg: {
  	width: 80,
  	height: 80,
  	borderRadius: 40,
  	borderWidth: 4,
    borderColor: 'orange',
  },
});

const c_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  	flexDirection: 'column',
  	marginLeft: 20,
  },
  title: {
  	color: 'black',
  	fontWeight: 'bold',
  	fontSize: 14,
  },
  subTitle: {
  	color: 'green',
  },
  text: {
  	color: '#333333',
  },
  imageContainer: {
  	width: 80,
  	height: 80,
  },
  contactImg: {
  	width: 80,
  	height: 80,
  	borderRadius: 40,
  	borderWidth: 4,
    borderColor: 'green',
  },
});

export default {
  i_styles: i_styles,
  u_styles: u_styles,
  c_styles: c_styles,
};