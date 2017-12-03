import React, { Component } from 'react';
import { Content, Text, Container, Header, Button, Icon, Thumbnail, View } from 'native-base';
import { Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { profile } from '../../Reducers';
import { logout, getProfile } from '../../Actions';
import ProfileSideBar from '../Profile/ProfileSideBar';

class SideBar extends Component {
  componentDidMount() {
    //console.log(this.props);
    this.props.getProfile(this.props.userId);
  }

  logout() {
    this.props.logout();
  }

  renderProfile = () => (
    <ProfileSideBar
      profileAvatar={this.props.ProfileImagePath}
      nome={`${this.props.UserName} ${this.props.LastName}`}
    />
  );

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: '#ddd' }}>
          {this.renderProfile()}
          <View>
            <Button iconLeft block style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}>
              <Icon name="wine" />
              <Text style={{ color: 'rgba(255,255,255,0.8)', alignSelf: 'center' }}>Eventos</Text>
            </Button>
            <Button iconLeft block style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}>
              <Icon name="shuffle" />
              <Text style={{ color: 'rgba(255,255,255,0.8)', alignSelf: 'center' }}>
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
              <Text style={{ color: 'rgba(255,255,255,0.8)', alignSelf: 'center' }}>
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
              <Text style={{ color: 'rgba(255,255,255,0.8)', alignSelf: 'center' }}>Sair</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

mapStateToProps = ({ profile }) => {
  const { UserName, LastName, ProfileImagePath } = profile;
  return { UserName, LastName, ProfileImagePath };
};

export default connect(mapStateToProps, { logout, getProfile })(SideBar);
