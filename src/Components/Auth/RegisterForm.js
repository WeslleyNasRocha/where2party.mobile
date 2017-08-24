import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
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
//import { Card, CardSection, Input, Button } from '../common';
import { passwordChanged, emailChanged, createAttempt } from '../../Actions';
import { auth } from '../../Reducers';


class RegisterForm extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        console.log(this.props);
        const { email, password } = this.props
        this.props.createAttempt({ email, password });
    }


    render() {
        return (
            <Container style={{backgroundColor:'#9c27b0'}}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => { Actions.pop() }}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:'rgba(255,255,255,0.8)'}}>Cadastre-se</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Image
                        source={require("../../../assets/img/Logo2.png")}
                        style={{ height: 150, width: 150, alignSelf: "center" }}
                    />
                    <Form>
                        <Item floatingLabel>                        
                            <Label style={{color:'rgba(255,255,255,0.6)'}}>Email</Label>
                          <Input
                                keyboardType="email-address"
                                returnKeyType="next"
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label style={{color:'rgba(255,255,255,0.6)'}}>Senha</Label>
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
                            onPress={() => { this.onButtonPress() }}
                        >
                            <Icon name='beer'/>                        
                            <Text>Let's go Party!</Text>
                        </Button>
                    </Form>
                    <Spinner
                        visible={this.props.loading}
                    />
                </Content>
            </Container>
            // <Card>
            //     <CardSection>
            //         <Input
            //             label="Email"
            //             onChangeText={this.onEmailChange.bind(this)}
            //             value={this.props.email}
            //         />
            //     </CardSection>
            //     <CardSection>
            //         <Input
            //             label="Senha"
            //             secure
            //             onChangeText={this.onPasswordChange.bind(this)}
            //             value={this.props.password}
            //         />
            //     </CardSection>
            //     <CardSection>
            //         <Button
            //             onPress={this.onButtonPress.bind(this)}
            //         >
            //             Cadastrar
            //         </Button>
            //     </CardSection>
            //     <Spinner
            //         visible={this.props.loading}
            //     />
            // </Card>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, loading, success } = auth;
    return {
        email,
        password,
        loading,
        success
    }
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    createAttempt
})(RegisterForm);