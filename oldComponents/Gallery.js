import React from 'react';
import { Platform, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

// Component imports
import GallerySquare from './GallerySquare';


export default class Gallery extends React.Component {
  render() {
    return (
      <View style ={styles.container}>

        <View style={styles.headerStyle}>
          <Text style={styles.headerFontStyle}> Gallery </Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          
          <View style={styles.rowStyle}>
            <GallerySquare name='Katie' date='4 days ago' image={require('../../assets/images/galleryImages/gallery1.jpg')} size={1}/>
            <GallerySquare name='Ian' date='10 days ago' image={require('../../assets/images/galleryImages/gallery2.jpg')} size={2}/>
            <GallerySquare name='Cole' date='1 week ago' image={require('../../assets/images/galleryImages/gallery3.jpg')} size={1}/>
          </View>

          <View style={styles.rowStyle}>
            <GallerySquare name='Hao' date='1 week ago' image={require('../../assets/images/galleryImages/gallery4.jpg')} size={2}/>
            <GallerySquare name='Alejandrina' date='2 weeks ago' image={require('../../assets/images/galleryImages/gallery5.jpg')} size={1}/>
          </View>
          

          <View style={styles.rowStyle}>
            <GallerySquare name='Bob' date='3 weeks ago' image={require('../../assets/images/galleryImages/gallery6.jpg')} size={1}/>
            <GallerySquare name='Jon' date='3 weeks ago' image={require('../../assets/images/galleryImages/gallery7.jpg')} size={2}/>
          </View>
        

          <View style={styles.rowStyle}>
            <GallerySquare name='Austin' date='1 month ago' image={require('../../assets/images/galleryImages/gallery8.jpg')} size={2}/>
            <GallerySquare name='Lily' date='2 months ago' image={require('../../assets/images/galleryImages/gallery9.jpg')} size={3}/>
          </View>

          <View style={styles.rowStyle}>
            <GallerySquare name='Alison' date='1 year ago' image={require('../../assets/images/galleryImages/gallery9.jpg')} size={2}/>
            <GallerySquare name='Samantha' date='1 year ago' image={require('../../assets/images/galleryImages/gallery10.jpg')} size={3}/>
            <GallerySquare name='George' date='1 year ago' image={require('../../assets/images/galleryImages/gallery11.jpg')} size={2}/>
          </View>

          <View style={styles.rowStyle}>
            <GallerySquare name='Jason' date='2 years ago' image={require('../../assets/images/galleryImages/gallery12.jpg')} size={2}/>
            <GallerySquare name='Elizabeth' date='2 years ago' image={require('../../assets/images/galleryImages/gallery13.jpg')} size={1}/>
          </View>

        </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    height: '100%',
    backgroundColor: 'white',
  },

  headerStyle: {
    top: 20,
    zIndex: 3,
    backgroundColor: 'transparent',
  },

  headerFontStyle: {
    color: 'orange',
    textAlign: 'center',
    fontSize: 32,
  },

  searchBarStyle: {
    top: 20,
    zIndex: 2,
    backgroundColor: 'white', 
    borderBottomColor: 'transparent', 
    borderTopColor: 'transparent'
  },


  contentContainer: {
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    paddingTop: 20,
    zIndex: 1,
  },

  rowStyle: {
    flexDirection: 'row',
    height: 200,
  },
  
  smallTile: {
    flex: 1,
  },
  
  mediumTile: {
    flex: 2,
  },
  
  bigTile: {
    flex: 3,
  },

});