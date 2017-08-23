import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Toast from "react-native-root-toast";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, Left, Body, Right, Title, Button, Text, Icon, Drawer } from "native-base"
import SideBar from "./SideBar";

class Feed extends Component {

    logout() {
        AsyncStorage.removeItem("user_data")
            .then(Actions.auth({ type: "replace" }))
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.openDrawer()} />
                    </Left>
                    <Body>
                        <Title>Eventos</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
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