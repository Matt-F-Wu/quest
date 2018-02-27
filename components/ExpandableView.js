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
    };
    console.debug(props.config);
    console.debug(this.state);
    this.state.width.addListener(({value}) => {this.state.width_v = value; console.debug("List: " + value)});
    this.state.height.addListener(({value}) => this.state.height_v = value);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.expand === nextProps.expand){
      //expand command did not change, ignore this
      return;
    }
    console.debug("Update expandable...");
    if(nextProps.expand){
      Animated.timing(
        this.state.width, 
        {
          toValue: this.props.config.endWidth, 
        }
      ).start();

      Animated.timing(
        this.state.height, 
        {
          toValue: this.props.config.endHeight, 
        }
      ).start();

    }else{
      Animated.timing(
        this.state.width, 
        {
          toValue: this.props.config.initialWidth, 
        }
      ).start();

      Animated.timing(
        this.state.height, 
        {
          toValue: this.props.config.initialHeight, 
        }
      ).start();
    }
  }

  render() {
    return (
      <Animated.View                 
        style={[{
          width: this.state.width_v,
          height: this.state.height_v,
          marginTop: (this.props.config.endHeight - this.state.height_v),
          marginRight: (this.props.config.endWidth - this.state.width_v),
          marginLeft: this.props.config.anchorX || 0,
          marginBottom: this.props.config.anchorY || 0,
        }, this.props.style]}>
        {this.state.width_v === this.props.config.endWidth? this.props.children : null}
      </Animated.View>
    );
  }
}