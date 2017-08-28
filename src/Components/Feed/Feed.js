import React, { Component } from "react";
import { AsyncStorage, ListView, RefreshControl } from "react-native";
import { connect } from "react-redux";
import Toast from "react-native-root-toast";
import Firebase from "firebase";
import { Actions, ActionConst } from "react-native-router-flux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Text,
  Drawer,
  Card,
  CardItem
} from "native-base";
import SideBar from "./SideBar";
// Import reducer and actions

class Feed extends Component {
  onRefreshPress = () => {
    console.log();

    Firebase.database().ref("/eventos/").once("value").then(snapshot => {
      console.log(snapshot.val());
    });
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#9c27b0" }}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.openDrawer()}>
              <Icon name="menu" size={30} color={"#ffffff"} />
            </Button>
          </Left>
          <Body>
            <Title style={{ alignSelf: "center", marginLeft: 65 }}>
              Eventos
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                Actions.createEvent();
              }}
            >
              <Icon name="plus" size={30} color={"#ffffff"} />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Button
            transparent
            style={{ alignSelf: "center" }}
            onPress={() => this.onRefreshPress()}
          >
            <Icon name="refresh" size={30} color={"#ffffff"} />
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {})(Feed);
