import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Toast from "react-native-root-toast";
import { Actions, ActionConst } from "react-native-router-flux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Container, Content, Header, Left, Body, Right, Title, Button, Text, Drawer } from "native-base"
import SideBar from "./SideBar";

class Feed extends Component {

    logout() {
        AsyncStorage.removeItem("user_data")
            .then(Actions.auth(ActionConst.BACK))
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.openDrawer()}>
                            <Icon name="menu" size={30} color={"#ffffff"} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Eventos</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { Actions.createEvent() }}>
                            <Icon name="plus" size={30} color={"#ffffff"} />
                        </Button>
                    </Right>
                </Header>
                <Content padder>

                    <Button
                        onPress={() => this.logout()}
                    >
                        <Text>
                            Log Out
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default Feed;