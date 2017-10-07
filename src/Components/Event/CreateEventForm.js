import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Geocoder from 'react-native-geocoding';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Form,
  Item,
  Button,
  Input,
  InputGroup,
  Icon,
  Label,
  Text,
  StyleProvider
} from 'native-base';

import SearchMap from './Components/SearchMap';
import { event } from '../../Reducers';
import {
  eventCreated,
  formValueChanged,
  dateTimeModalStatus,
  dateTimeConfirm,
  cancelForm,
  eventImageChange
} from '../../Actions';

class CreateEventForm extends Component {
  onButtonPress() {
    const {
      Titulo,
      Address,
      Descricao,
      Tags,
      Local,
      Data,
      ImageData,
      ImagePath,
      ImageMime
    } = this.props;
    this.props.eventCreated({
      Titulo,
      Address,
      Local,
      Descricao,
      Tags,
      Data,
      ImageData,
      ImageMime,
      ImagePath
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.Address);
  }

  imagePick() {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true
    }).then(image => {
      const { path, size, data, mime } = image;
      this.props.eventImageChange({ path, size, data, mime });
    });
  }

  modalStatus(status) {
    this.props.dateTimeModalStatus(status);
  }

  modalConfirm(date) {
    console.log(date);
    this.props.dateTimeConfirm(date);
    this.modalStatus(false);
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#9c27b0' }}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
                this.props.cancelForm();
              }}
            >
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ flexDirection: 'row', marginRight: 10 }}>Crie o seu evento</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Image
                source={{ uri: this.props.ImagePath }}
                style={{
                  height: 200,
                  width: 300
                }}
              />
              <Button onPress={() => this.imagePick()}>
                <Text>Pick an image</Text>
              </Button>
            </Item>
            <Item>
              <Label style={{ color: 'rgba(255,255,255,0.6)' }}>Titulo</Label>
              <Input
                onChangeText={text =>
                  this.props.formValueChanged({
                    prop: 'Titulo',
                    value: text
                  })}
                value={this.props.Titulo}
              />
            </Item>
            <Item>
              <Button
                style={{ marginLeft: -15, width: '100%' }}
                transparent
                onPress={() => {
                  Actions.SearchMap();
                }}
              >
                <Label style={{ color: 'rgba(255,255,255,0.6)' }}>Local</Label>
                <Text numberOfLines={1} style={{ color: '#fff', paddingLeft: 20, width: '100%' }}>
                  {this.props.Address}
                </Text>

                {/* <Icon active onPress={() => Actions.map()} name="pin" /> */}
              </Button>
            </Item>
            <Item>
              <Label style={{ color: 'rgba(255,255,255,0.6)' }}>Descrição</Label>
              <Input
                onChangeText={text =>
                  this.props.formValueChanged({
                    prop: 'Descricao',
                    value: text
                  })}
                value={this.props.Descricao}
              />
            </Item>
            <Item last>
              <Label style={{ color: 'rgba(255,255,255,0.6)' }}>Tags</Label>
              <Input />
            </Item>
            <Item
              last
              onPress={() => {
                this.modalStatus(true);
              }}
            >
              <Label style={{ color: 'rgba(255,255,255,0.6)' }}>Data</Label>
              <Input editable={false} value={this.props.Data} />
            </Item>
            <Button
              iconLeft
              style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}
              block
              onPress={() => this.onButtonPress()}
            >
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}> Criar evento</Text>
            </Button>
          </Form>
          <DateTimePicker
            isVisible={this.props.StatusDateTime}
            onCancel={() => this.modalStatus(false)}
            onConfirm={date => this.modalConfirm(date)}
          />
          <Spinner visible={this.props.Loading} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ event }) => {
  const {
    Titulo,
    Descricao,
    Local,
    Tags,
    Data,
    Address,
    StatusDateTime,
    Loading,
    Error,
    ImagePath,
    ImageData,
    ImageMime
  } = event;
  return {
    Titulo,
    Descricao,
    Local,
    Address,
    Tags,
    Data,
    StatusDateTime,
    Loading,
    Error,
    ImagePath,
    ImageData,
    ImageMime
  };
};

export default connect(mapStateToProps, {
  formValueChanged,
  eventCreated,
  dateTimeModalStatus,
  dateTimeConfirm,
  cancelForm,
  eventImageChange
})(CreateEventForm);
