import React from 'react';
import { Animated, Text, View } from 'react-native';

export default class FadeOutView extends React.Component {

  render() {

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: this.props.fadeAnim, // Binds directly
          transform: [{
            translateY: this.props.fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 150]  // 0 : 150, 0.5 : 75, 1 : 0
            }),
          }],         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}