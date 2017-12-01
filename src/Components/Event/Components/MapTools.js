import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class MapTools extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>{this.props.distance}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>{this.props.duration}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: -40,
    marginBottom: 20,
    paddingLeft: 70,
    paddingRight: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch"
  },
  box: {
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 2,
    alignSelf: "center"
  },
  text: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 5,
    paddingRight: 5,
    color: "#fff"
  }
});

export default MapTools;
