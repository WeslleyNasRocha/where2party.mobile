import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon
} from 'native-base';
import EventList from '../Event/EventList';
// Import reducer and actions

class Feed extends Component {
  constructor(props) {
    super(props);

    firebase
      .database()
      .ref(`usersProfiles/${this.props.userId}`)
      .once('value')
      .then(snapshot => {
        const user = snapshot;
      });
    console.log(user);
  }
  render() {
    return (
      <Container style={{ backgroundColor: '#9c27b0' }}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.openDrawer()}>
              <Icon name="menu" size={30} color={'#ffffff'} />
            </Button>
          </Left>
          <Body>
            <Title style={{ alignSelf: 'center', marginLeft: 65 }}>
              Eventos
            </Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="ios-refresh" size={30} color={'#ffffff'} />
            </Button>
            <Button
              transparent
              onPress={() => {
                Actions.createEvent();
              }}
            >
              <Icon name="add" size={30} color={'#ffffff'} />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <EventList />
        </Content>
      </Container>
    );
  }
}

export default Feed;
