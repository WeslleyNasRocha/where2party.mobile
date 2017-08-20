import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
import { Card, CardSection, Input, Button } from '../common';
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

    componentDidUpdate() {
        if (this.props.success !== "") {
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
                        onPress={this.onButtonPress.bind(this)}
                    >
                        Cadastrar
                    </Button>
                </CardSection>
                <Spinner
                    visible={this.props.loading}
                />
            </Card>
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