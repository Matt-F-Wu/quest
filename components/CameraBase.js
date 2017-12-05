import React from 'react';
import { Text, View, Image, TouchableOpacity, Button, StyleSheet, Alert} from 'react-native';
import { Camera, Permissions } from 'expo';
import {RkButton} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import Touchables from '../components/Touchables';
import Colors from '../constants/Colors';

export default class CameraBase extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    has_button: false,
    has_objects: false,
    objects: [],
    button_icon: 'camera',
    styles: null,
    buttonPress: () => Alert.alert("Not Implemented!")
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
    this.setState({ hasCameraPermission: status === 'granted' && (status_record === 'granted' || !status_record) });
    this.customize(this.num_objs);
  }

  _renderTextLable(){
    if(this.state.has_lable){
      return (
        <Text style={[{position: 'absolute', left: this.state.lx, 
        top: this.state.ly}, 
        this.state.styles.lable]}>{this.state.textLable}</Text>
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

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera {this.st} and {this.str}</Text>;
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'red', }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }} >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
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
                <Icon name='refresh' color={Colors.tintColor} size={30}/>
              </TouchableOpacity>
            </View>
          </Camera>
          {this._renderObjects()}
          {this._renderButton()}
          {this._renderTextLable()}
        </View>
      );
    }
  }
}