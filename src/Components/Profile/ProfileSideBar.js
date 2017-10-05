import React, { Component } from 'react';
import { View } from 'react-native';
import { Thumbnail, Text } from 'native-base';

class ProfileSideBar extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={{ backgroundColor: '#9c27b0' }}>
        <Thumbnail
          large
          bordered
          source={{ uri: this.props.profileAvatar }}
          style={{
            alignSelf: 'center',
            marginTop: 20,
            height: 150,
            width: 150
          }}
        />
        <View style={{ alignItems: 'center', paddingTop: 25, paddingBottom: 25 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30 }}>{this.props.nome}</Text>
        </View>
      </View>
    );
  }
}

export default ProfileSideBar;
