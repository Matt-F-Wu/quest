import React from 'react';
import { Text, View, Image, TouchableOpacity, Button, StyleSheet, Alert} from 'react-native';
import { Camera, Permissions, Location, Constants } from 'expo';
import {RkButton} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import Touchables from '../Touchables';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import ProfileOverlay from './ProfileOverlay';

export default class CameraBase extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    has_button: false,
    has_objects: false,
    objects: [],
    button_icon: 'camera',
    styles: null,
    buttonPress: () => Alert.alert("Not Implemented!"),
    mountCam: true,
    locationResult: null,

    // State stuff for landing page
    has_overlay: false,
    has_refresh: true,
    has_label: false,
    has_target: false,
    textLabel: null,
  };

  num_objs = 0;

  customize(num){
    //do nothing for the base class
  }

  arrived(){
    //do something at subclass
  }

  async componentWillMount() {
    const { status_record } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ mountCam: true, hasCameraPermission: status === 'granted' && (status_record === 'granted' || !status_record) });
    this.customize(this.num_objs);
  }

  componentDidMount() {
    /*
    Location.watchPositionAsync({enableHighAccuracy: true, distanceInterval: 0.5}, async function(location){
      let prev_loc = this.state.locationResult;

      if(prev_loc === null) {
        this.setState({locationResult: location});
        return;
      }

      let heading = await Location.getHeadingAsync();
      //Find vector of phone's direction
      let headY = Math.sin(heading.magHeading);
      let headX = Math.cos(heading.magHeading);
      //dot product find Y
      let dx = location.coords.latitude - prev_loc.coords.latitude;
      let dy = location.coords.longitude - prev_loc.coords.longitude;

      let motionY = dx*headX + dy*headY;
      let motionX = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2) - Math.pow(motionY, 2), 0.5);
      
      this.setState({locationResult: location});
      
      console.debug("MotionX: " + motionX + " MotionY: " + motionY);
      
      let stepSize = 150000;
      let threshold = 0;
      if(Math.abs(motionY*stepSize) > threshold || Math.abs(motionX*stepSize) > threshold){
        for(i = 0; i < this.num_objs; i++){
          if (this.state.objects[i]){ 
            this.state.objects[i].x = parseInt(this.state.objects[i].x.slice(0, -1)) - motionX*stepSize + "%";
            this.state.objects[i].y = parseInt(this.state.objects[i].y.slice(0, -1)) - motionY*stepSize + "%";
            console.debug("X: " + this.state.objects[i].x + " Y: " + this.state.objects[i].y);
          }
        }
      }
    }.bind(this));
    */
  }

  _renderProfileOverlay(){
    if(this.state.has_overlay){
      return ( 
        <ProfileOverlay/>
      );
    } else {
      return null;
    }
  }

  // _renderTarget(){
  //   if(this.state.has_target){
  //     return (    
  //       <TouchableOpacity style={{top: 30, alignSelf:'center', backgroundColor:'transparent'}}>
  //         <Icon2 name="target" size={100} color={Colors.tintColor} />
  //       </TouchableOpacity>  
  //     );
  //   } else {
  //     return null;
  //   }
  // }

  _renderTextLabel(){
    if(this.state.has_label){
      return (
        <Text style={{fontFamily: Fonts.logoFont, fontSize: Fonts.logoFontSize, backgroundColor: 'transparent', color: Colors.tintColor, 
                      position:'absolute', top: 22, alignSelf: 'center'}}>
                      {this.state.textLabel}</Text>
      );
    }else{
      return null;
    }
  }

  _renderButton(){
    if(this.state.has_button){
      let styles = this.state.styles;
      return (
        
        <RkButton onPress={this.state.buttonPress.bind(this)} 
          style={[{position: 'absolute', left: '40%', top: '90%', width: '20%', height: '8%', marginBottom: '2%',}, styles.button]} >
          <Icon name={this.state.button_icon} color='#fff' size={30} />
        </RkButton>
        
      );
    }else{
      return null;
    }
    
  }

  _renderObjects(){
    // Generate a bunch of objects, each with some data
    if(this.state.has_objects){
      let objs = this.state.objects;
      // Render a bunch of Touchables, e.g.coins
      let objects = objs.map((obj, i) =>
        <View key={i} style={{position: 'absolute', left: obj.x, top: obj.y, 
        width: obj.w, height: obj.h,}}>
          <Touchables key={i} onClick={() => {
              this.num_objs--; 
              if(this.num_objs === 0){
                /*have collected all coins, assume at destination, task 2*/
                this.arrived();
              }
              else if(this.num_objs < 0){
                /*Finding the quest, task 3*/
                if(obj.onClick){
                  //If object is clickable, has onClick method
                  obj.onClick();
                }
              }
              else{
                this.customize(this.num_objs);
              }
            }
          }
          hasImage={true} 
          styles={this.state.styles} 
          image={obj.image}/>
        </View>
      );
      return objects;
    }
    else{
      return null;
    }
    
  }

  _renderCam(){
    if (this.state.mountCam){
      return (
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }} >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              {this.state.has_overlay ? <ProfileOverlay/> : null}
              {this.state.has_target ?   
                    <TouchableOpacity style={{alignSelf:'center', backgroundColor:'transparent'}}>
                      <Icon2 name="target" size={250} color={Colors.tintColor} />
                    </TouchableOpacity> 
              : null}

              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  marginBottom: '2%',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                {this.state.has_refresh ? <Icon name='refresh' color={Colors.tintColor} size={30}/> : null}     
              </TouchableOpacity>
            </View>
          </Camera>
        );
    } else{
      return (<Text>Camera Unmounted</Text>);
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera {this.st} and {this.str}</Text>;
    } else {
      return (
        <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>

          {this._renderCam()}
          {this._renderObjects()}
          {this._renderButton()}
          {this._renderTextLabel()}
        </View>
      );
    }
  }
}