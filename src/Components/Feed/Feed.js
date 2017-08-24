import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Toast from "react-native-root-toast";
import { Actions } from "react-native-router-flux";
import { Container, Content, Header, Left, Body, Right, Title, Button, Text, Icon, Drawer } from "native-base"
import SideBar from "./SideBar";

class Feed extends Component {

    
    render() {
        return (
            <Container style={{backgroundColor: '#9c27b0'}}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ alignSelf: 'center', marginLeft: 65 }}>Eventos</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { Actions.createEvent() }}>
                            <Icon name="add" />
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                    
                </Content>
            </Container>
        );
    }
}

export default Feed;