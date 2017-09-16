import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Form,
  Item,
  Input,
  Label,
  Text
} from 'native-base';
import { passwordChanged, emailChanged, createAttempt, backForm } from '../../Actions';
import { auth } from '../../Reducers';

class RegisterForm extends Component {
  componentDidUpdate() {
    if (this.props.error !== '') {
      const toast = Toast.show(this.props.error, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    //console.log(this.props);
    const { email, password } = this.props;
    this.props.createAttempt({ email, password });
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#9c27b0' }}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.backForm()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: 'rgba(255,255,255,0.8)' }}>Cadastre-se</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Image
            source={require('../../../assets/img/Logo2.png')}
            style={{ height: 150, width: 150, alignSelf: 'center' }}
          />
          <Form>
            <Item floatingLabel>
              <Label style={{ color: 'rgba(255,255,255,0.6)' }}>Email</Label>
              <Input
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </Item>
            <Item floatingLabel last>
              <Label style={{ color: 'rgba(255,255,255,0.6)' }}>Senha</Label>
              <Input
                secureTextEntry
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </Item>
            <Button
              block
              rounded
              icon
              style={{ marginTop: 20 }}
              onPress={() => {
                this.onButtonPress();
              }}
            >
              <Icon name="beer" />
              <Text>Let's go Party!</Text>
            </Button>
          </Form>
          <Spinner visible={this.props.loading} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, loading, success, error } = auth;
  return {
    email,
    password,
    loading,
    success,
    error
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  createAttempt,
  backForm
})(RegisterForm);
