import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from "react-redux"
import Toast from 'react-native-root-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
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
import { emailChanged, passwordChanged, loginAttempt, loggedUser } from "../../Actions"

class LoginForm extends Component {

    constructor(props) {
        super(props);
        AsyncStorage.getItem("user_data")
            .then((user_data_json) => {
                let user_data = JSON.parse(user_data_json);
                if (user_data != null) {
                    Actions.Feed({ type: "reset" });
                }
            })
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        console.log(this.props);
        const { email, password } = this.props
        this.props.loginAttempt({ email, password });
    }

    componentDidUpdate() {
        if (this.props.error !== "") {
            const toast = Toast.show(this.props.error, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });
        };
    }


    render() {
        return (

            <Container style={{backgroundColor: '#9c27b0'}}>
                <Content padder>
                    <Image
                        source={require("../../../assets/img/Logo2.png")}
                        style={{ height: 200, width: 200, alignSelf: "center", marginTop: 15 }}
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
                            icon
                            style={{ marginTop: 30, marginRight: 30, marginLeft: 30 }}
                            rounded
                            onPress={() => { this.onButtonPress() }}
                        >
                        <Icon name='people'/>
                            <Text style={{color:'rgba(255,255,255,0.8)'}}>Login</Text>
                        </Button>
                        <Button
                            style={{ marginTop: 20, marginRight: 30, marginLeft: 30 }}
                            rounded
                            block
                            icon
                            onPress={() => Actions.register()}
                        >
                            <Icon name='add-circle'/>
                            <Text style={{color:'rgba(255,255,255,0.8)', alignSelf: "center"}}>Cadastrar-se</Text>
                        </Button>
                    </Form>
                    <Spinner
                        visible={this.props.loading}
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, loading, error, logged } = auth;
    return {
        email,
        password,
        loading,
        error,
        logged
    }
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginAttempt,
    loggedUser
})(LoginForm);