import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
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
    Text
} from 'native-base';

import { event } from '../../Reducers';
import { eventCreated, formValueChanged } from "../../Actions"

class CreateEventForm extends Component {

    onButtonPress() {
        console.log("pressed");
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => { Actions.pop() }} >
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Crie o seu evento</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item >
                            <Label>Titulo</Label>
                            <Input
                                onChangeText={text => this.props.formValueChanged({ prop: "Titulo", value: text })}
                                value={this.props.Titulo}
                            />
                        </Item>
                        <Item>
                            <Label>Local</Label>
                            <Input />
                            <Icon
                                active
                                onPress={() => Actions.map()}
                                name="pin"
                            />

                        </Item>
                        <Item >
                            <Label>Descrição</Label>
                            <Input
                                onChangeText={text => this.props.formValueChanged({ prop: "Titulo", value: text })}
                                value={this.props.Titulo}
                            />
                        </Item>
                        <Item last>
                            <Label>Tags</Label>
                            <Input />
                        </Item>
                        <Item last>
                            <Label>Data</Label>
                            <Input />
                        </Item>
                        <Button block
                            onPress={() => this.onButtonPress()}
                        >
                            <Text> Criar evento</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ event }) => {
    const { Titulo, Descricao, Local, Tags, Data } = event;
    return {
        Titulo,
        Descricao,
        Local,
        Tags,
        Data
    }
}

export default connect(mapStateToProps, { formValueChanged, eventCreated })(CreateEventForm);