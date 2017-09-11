import React, { Component } from 'react';
import { View, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

class Splash extends Component {
  componentDidMount() {
    AsyncStorage.getItem('user_data').then(user_data_json => {
      const user_data = JSON.parse(user_data_json);
      if (user_data != null) {
        Actions.Feed({ type: 'replace' });
      } else {
        Actions.auth({ type: 'replace' });
      }
    });
  }

  render() {
    return (
      <Image source={require('../../assets/img/splashscreen.png')} style={styles.BackSplash}>
        <Spinner visible />
      </Image>
    );
  }
}

const styles = {
  BackSplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null
  }
};

export default Splash;
