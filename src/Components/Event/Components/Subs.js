import _ from "lodash";
import React, { Component } from "react";
import { View, Text } from "react-native";
import GridView from "react-native-gridview";
import firebase from "firebase";

class Subs extends Component {
  componentWillMount = () => {
    console.log(this.props);

    firebase
      .app()
      .database()
      .ref("subs/" + this.props.eventId)
      .on("value", snapshot => {
        var vals = snapshot.val();
      });

    // const dataSource = new GridView.DataSource({
    //   rowHasChanged: (r1, r2) => r1 !== r2
    // }).cloneWithRows(randomData);
  };

  render() {
    return (
      <View>
        <Text>Subs</Text>
      </View>
    );
  }
}

export default Subs;
