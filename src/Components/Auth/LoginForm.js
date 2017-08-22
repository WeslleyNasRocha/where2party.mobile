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