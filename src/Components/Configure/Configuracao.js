import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
  Title
} from "native-base";

class Configuracao extends Component {
  onButtonPress() {
    console.log("pressed");
    //this.setState({ address: json.results[0].formatted_address })},
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#9c27b0" }}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
              }}
            >
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ flexDirection: "row", marginRight: 10 }}>
              Configurações
            </Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem icon>
              <Left>
                <Icon name="alert" style={{ color: "#FFFF" }} />
              </Left>
              <Body>
                <Text style={{ color: "#FFFF" }}>Notificações</Text>
              </Body>
              <Right>
                <Switch value={false} />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Configuracao;
