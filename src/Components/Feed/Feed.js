import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Left, Body, Right, Title, Button, Icon, Segment, Text } from 'native-base';
import EventList from '../Event/EventList';
import {eventsFetch} from '../../Actions/';
import firebase from 'firebase';
import Event from '../Event/Event';
// Import reducer and actions

class Feed extends Component {
  
  onAZPress() {
    this.props.eventsFetch(1);
  }

  onTitulosPress() {
    this.props.eventsFetch(2);
  }

  onProximidadePress() {
    this.props.eventsFetch(3);
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
            <Title style={{ alignSelf: 'center', marginLeft: 65 }}>Eventos</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="ios-refresh" size={30} color={'#ffffff'} />
            </Button>
          </Right>
        </Header>
        <Segment style={{backgroundColor: '#6D3983'}}>
          <Button first onPress = {() => {this.onAZPress()}}>
            <Text>A-Z</Text>
          </Button>
          <Button onPress = {() => {this.onTitulosPress()}}>
            <Text>Data</Text>
          </Button>
          <Button last onPress = {() => {this.onProximidadePress()}}>
            <Text>Proximidade</Text>
          </Button>
        </Segment>
        <Content padder>
          <EventList />
        </Content>
      </Container>
    );
  }
}


export default connect(mapStateToProps, {
  eventsFetch
})(Feed);