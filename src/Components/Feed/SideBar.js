import React, { Component } from "react";
import {
  Content,
  Text,
  Container,
  Header,
  Button,
  Icon,
  Thumbnail
} from "native-base";
import { Image, AsyncStorage } from "react-native";
import { Actions, ActionConst } from "react-native-router-flux";

class SideBar extends Component {
  logout() {
    AsyncStorage.removeItem("user_data").then(Actions.auth(ActionConst.RESET));
  }
  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: "#9c27b0" }}>
          <Thumbnail
            large
            bordered
            source={require("../../../assets/img/Demo_Drawer.png")}
            style={{
              alignSelf: "center",
              marginTop: 20,
              height: 150,
              width: 150
            }}
          />
          <Button
            iconLeft
            block
            style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}
          >
            <Icon name="wine" />
            <Text
              style={{ color: "rgba(255,255,255,0.8)", alignSelf: "center" }}
            >
              Eventos
            </Text>
          </Button>
          <Button
            onPress={() => {
              this.props.closeDrawer();
              Actions.createEvent();
            }}
            iconLeft
            block
            style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}
          >
            <Icon name="add-circle" />
            <Text
              style={{ color: "rgba(255,255,255,0.8)", alignSelf: "center" }}
            >
              Criar Evento
            </Text>
          </Button>
          <Button
            iconLeft
            block
            style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}
          >
            <Icon name="shuffle" />
            <Text
              style={{ color: "rgba(255,255,255,0.8)", alignSelf: "center" }}
            >
              Alterar Perfil
            </Text>
          </Button>
          <Button
            onPress={() => {
              this.props.closeDrawer();
              Actions.configuracao();
            }}
            iconLeft
            block
            style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}
          >
            <Icon name="settings" />
            <Text
              style={{ color: "rgba(255,255,255,0.8)", alignSelf: "center" }}
            >
              Configurações
            </Text>
          </Button>
          <Button
            iconLeft
            onPress={() => this.logout()}
            block
            iconLeft
            style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}
          >
            <Icon name="exit" />
            <Text
              style={{ color: "rgba(255,255,255,0.8)", alignSelf: "center" }}
            >
              Sair
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default SideBar;
