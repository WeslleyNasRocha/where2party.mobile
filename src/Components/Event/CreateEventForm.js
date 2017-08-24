import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Geocoder from 'react-native-geocoding';
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

import { event } from '../../Reducers';
import { eventCreated, formValueChanged } from "../../Actions"



class CreateEventForm extends Component {


    onButtonPress() {
        console.log("pressed");
        //this.setState({ address: json.results[0].formatted_address })},
    }


    componentDidUpdate() {
        if (this.props.Local != null) {


        }
    }

    render() {
        return (

            <Container style={{backgroundColor: '#9c27b0'}}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => { Actions.pop() }} >
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ flexDirection: 'row', marginRight: 10 }}>Crie o seu evento</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item >
                            <Label style={{color:'rgba(255,255,255,0.6)'}}>Titulo</Label>
                            <Input
                                onChangeText={text => this.props.formValueChanged({ prop: "Titulo", value: text })}
                                value={this.props.Titulo}
                            />
                        </Item>
                        <Item>
                            <Label style={{color:'rgba(255,255,255,0.6)'}}>Local</Label>
                            <Input />
                            <Icon
                                active
                                onPress={() => Actions.map()}
                                name="pin"
                            />

                        </Item>
                        <Item >
                            <Label style={{color:'rgba(255,255,255,0.6)'}}>Descrição</Label>
                            <Input
                                onChangeText={text => this.props.formValueChanged({ prop: "Titulo", value: text })}
                                value={this.props.Titulo}
                            />
                        </Item>
                        <Item last>
                            <Label style={{color:'rgba(255,255,255,0.6)'}}>Tags</Label>
                            <Input />
                        </Item>
                        <Item last>
                            <Label style={{color:'rgba(255,255,255,0.6)'}}>Data</Label>
                            <Input />
                        </Item>
                        <Button 
                            iconLeft
                            style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}
                            block
                            onPress={() => this.onButtonPress()}
                        >
                            <Text style={{color:'rgba(255,255,255,0.8)'}}> Criar evento</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ event }) => {
    const { Titulo, Descricao, Local, Tags, Data, Address } = event;
    return {
        Titulo,
        Descricao,
        Local,
        Address,
        Tags,
        Data
    }
}

export default connect(mapStateToProps, { formValueChanged, eventCreated })(CreateEventForm);