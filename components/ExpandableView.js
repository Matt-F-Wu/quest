import React from 'react';
import { Animated, Text, View } from 'react-native';

export default class ExpandableView extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      width: new Animated.Value(props.config.initialWidth),
      height: new Animated.Value(props.config.initialHeight),
      width_v: props.config.initialWidth,
      height_v: props.config.initialHeight,
      finished: false,
    };
    this.state.width.addListener(({value}) => this.state.width_v = value);
    this.state.height.addListener(({value}) => this.state.height_v = value);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.expand === nextProps.expand){
      //expand command did not change, ignore this
      return;
    }
    //console.debug("Update expandable...");
    if(nextProps.expand){
      Animated.timing(
        this.state.width, 
        {
          toValue: this.props.config.endWidth, 
          duration: this.props.config.duration || 500,
        }
      ).start();

      Animated.timing(
        this.state.height, 
        {
          toValue: this.props.config.endHeight, 
          duration: this.props.config.duration || 500,
        }
      ).start(() => {this.setState({finished: true});} );

    }else{
      this.setState({finished: false});
      Animated.timing(
        this.state.width, 
        {
          toValue: this.props.config.initialWidth,
          duration: this.props.config.duration || 500,
        }
      ).start();

      Animated.timing(
        this.state.height, 
        {
          toValue: this.props.config.initialHeight,
          duration: this.props.config.duration || 500, 
        }
      ).start();
    }
  }

  render() {
    let mTop = this.props.down ? this.props.config.anchorY || 0 : (this.props.config.endHeight - this.state.height_v);
    let mBot = this.props.down ? (this.props.config.endHeight - this.state.height_v) : this.props.config.anchorY || 0;
    let mLeft = this.props.left? (this.props.config.endWidth - this.state.width_v) : this.props.config.anchorX || 0;
    let mRight = this.props.left? this.props.config.anchorX || 0 : (this.props.config.endWidth - this.state.width_v);
    
    return (
      <Animated.View                 
        style={[{
          width: this.state.width,
          height: this.state.height,
          marginTop: mTop,
          marginRight: mRight,
          marginLeft: mLeft,
          marginBottom: mBot,
        }, this.props.style]}>
        {this.state.finished ? this.props.children : null}
      </Animated.View>
    );
  }
}