import React, { Component } from 'react';
import { View, Image } from 'react-native';

class ImageBanner extends Component {
  render() {
    return (
      <View style={{ flex: 1, height: 300 }}>
        <Image source={this.props.imgSource} style={{ flex: 1, alignSelf: "stretch" }} />
      </View>
    );
  }
}

export default ImageBanner;