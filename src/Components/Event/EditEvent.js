import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
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
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ImagePicker } from 'react-native-image-crop-picker';

import { event } from '../../Reducers';
import {
  eventCreated,
  formValueChanged,
  dateTimeModalStatus,
  dateTimeConfirm,
  cancelForm,
  eventImageChange
} from '../../Actions';

class EditEvent extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.initializeForm(props.cust);
  }

  initializeForm(prevProps) {
    this.props.formValueChanged({
      prop: 'Titulo',
      value: prevProps.Titulo
    });
    this.props.formValueChanged({
      prop: 'Descricao',
      value: prevProps.Descricao
    });
    this.props.formValueChanged({
      prop: 'Address',
      value: prevProps.Address
    });
    this.props.formValueChanged({
      prop: 'Data',
      value: prevProps.Data
    });
    this.props.formValueChanged({
      prop: 'Local',
      value: prevProps.Local
    });
    this.props.formValueChanged({
      prop: 'ImagePath',
      value: prevProps.imgUrl.uri
    });
  }

  saveEdit() {
    const {
      Titulo,
      Address,
      Descricao,
      Tags,
      Local,
      Data,
      ImageData,
      ImagePath,
      ImageMime,
      cust
    } = this.props;
    this.props.eventCreated({
      Titulo,
      Address,
      Descricao,
      Tags,
      Local,
      Data,
      ImageData,
      ImagePath,
      ImageMime,
      edit: cust.uid
    });
  }

  imagePick() {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true
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
    console.log(this.props);
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ flexDirection: 'row', marginRight: 10 }}>Edite o seu evento</Title>
          </Body>
        </Header>
        <Content style={{ backgroundColor: '#9c27b0' }}>
          <Form>
            <Item style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Image
                source={{ uri: this.props.ImagePath }}
                style={{
                  height: 200,
                  width: 300
                }}
              />
              <Button>
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
                <Text numberOfLines={1} style={{ color: 'black', paddingLeft: 20 }}>
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
              onPress={() => this.saveEdit()}
            >
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}> Salvar evento</Text>
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

const mapStateToProps = state => {
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
  } = state.event;
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
  eventCreated,
  formValueChanged,
  dateTimeModalStatus,
  dateTimeConfirm,
  cancelForm,
  eventImageChange
})(EditEvent);
