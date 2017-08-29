import React, { Component } from "react";
import { connect } from "react-redux";
import { Keyboard, View, TouchableWithoutFeedback } from "react-native";
import { Actions } from "react-native-router-flux";
import DateTimePicker from "react-native-modal-datetime-picker";
import Geocoder from "react-native-geocoding";
import Spinner from "react-native-loading-spinner-overlay";
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
} from "native-base";

import { event } from "../../Reducers";
import {
   eventCreated,
   formValueChanged,
   dateTimeModalStatus,
   dateTimeConfirm
} from "../../Actions";

class CreateEventForm extends Component {
   onButtonPress() {
      const { Titulo, Address, Descricao, Tags, Local, Data } = this.props;
      this.props.eventCreated({
         Titulo,
         Address,
         Local,
         Descricao,
         Tags,
         Data
      });
   }

   modalStatus(status) {
      this.props.dateTimeModalStatus((status = !this.props.StatusDateTime));
   }

   modalConfirm(date) {
      this.props.dateTimeConfirm(date);
      this.modalStatus(false);
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
                     Crie o seu evento
                  </Title>
               </Body>
            </Header>
            <Content>
               <Form>
                  <Item>
                     <Label style={{ color: "rgba(255,255,255,0.6)" }}>
                        Titulo
                     </Label>
                     <Input
                        onChangeText={text =>
                           this.props.formValueChanged({
                              prop: "Titulo",
                              value: text
                           })}
                        value={this.props.Titulo}
                     />
                  </Item>
                  <Item>
                     <Label style={{ color: "rgba(255,255,255,0.6)" }}>
                        Local
                     </Label>
                     <Input value={this.props.Address} />
                     <Icon active onPress={() => Actions.map()} name="pin" />
                  </Item>
                  <Item>
                     <Label style={{ color: "rgba(255,255,255,0.6)" }}>
                        Descrição
                     </Label>
                     <Input
                        onChangeText={text =>
                           this.props.formValueChanged({
                              prop: "Descricao",
                              value: text
                           })}
                        value={this.props.Descricao}
                     />
                  </Item>
                  <Item last>
                     <Label style={{ color: "rgba(255,255,255,0.6)" }}>
                        Tags
                     </Label>
                     <Input />
                  </Item>
                  <Item
                     last
                     onPress={() => {
                        this.modalStatus();
                     }}
                  >
                     <Label style={{ color: "rgba(255,255,255,0.6)" }}>
                        Data
                     </Label>
                     <Input editable={false} value={this.props.Data} />
                  </Item>
                  <Button
                     iconLeft
                     style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}
                     block
                     onPress={() => this.onButtonPress()}
                  >
                     <Text style={{ color: "rgba(255,255,255,0.8)" }}>
                        {" "}
                        Criar evento
                     </Text>
                  </Button>
               </Form>
               <DateTimePicker
                  isVisible={this.props.StatusDateTime}
                  onCancel={() => this.modalStatus(false)}
                  onConfirm={this.modalConfirm}
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
      Loading
   } = event;
   return {
      Titulo,
      Descricao,
      Local,
      Address,
      Tags,
      Data,
      StatusDateTime,
      Loading
   };
};

export default connect(mapStateToProps, {
   formValueChanged,
   eventCreated,
   dateTimeModalStatus,
   dateTimeConfirm
})(CreateEventForm);
