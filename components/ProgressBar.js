import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Easing,
} from 'react-native';
import Colors from '../constants/Colors';

var styles = StyleSheet.create({
  background: {
    backgroundColor: '#bbbbbb',
    height: 5,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: Colors.tintColor,
    height: "100%",
  }
});

export default class ProgressBar extends React.Component {
  state = {
    progress: this.props.initialProgress || 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
      this.update(this.props.progress);
    }
  }

  render() {
    return (
      <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
        <View style={[styles.fill, this.props.fillStyle, { width: this.state.progress * 100 + '%' }]}/>
      </View>
    );
  }

  update(p) {
    this.setState({progress: p});
  }
};

ProgressBar.defaultProps = {
    style: styles,
};

module.exports = ProgressBar;