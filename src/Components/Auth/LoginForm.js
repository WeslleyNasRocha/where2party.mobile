import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from "react-redux"
import Toast from 'react-native-root-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import {
    Card,
    CardSection,
    Input,
    Button
} from '../common';
import { emailChanged, passwordChanged, loginAttempt } from "../../Actions"

class LoginForm extends Component {

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
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Senha"
                        secure
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                <CardSection>
                    <Button
                        onPress={() => Actions.register()}
                    >
                        Cadastre-se
                    </Button>
                    <Button
                        onPress={this.onButtonPress.bind(this)}
                    >
                        Login
                    </Button>
                </CardSection>
                <Spinner
                    visible={this.props.loading}
                />
            </Card>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, loading, error } = auth;
    return {
        email,
        password,
        loading,
        error
    }
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginAttempt
})(LoginForm);