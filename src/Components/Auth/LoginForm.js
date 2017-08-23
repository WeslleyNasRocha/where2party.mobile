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

            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Faça o login</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Image
                        source={require("../../../assets/img/Logo.png")}
                        style={{ height: 150, width: 150, alignSelf: "center" }}
                    />
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                keyboardType="email-address"
                                returnKeyType="next"
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Senha</Label>
                            <Input
                                secureTextEntry
                                onChangeText={this.onPasswordChange.bind(this)}
                                value={this.props.password}
                            />
                        </Item>
                        <Button
                            block
                            style={{ marginTop: 20 }}
                            onPress={() => { this.onButtonPress() }}
                        >
                            <Text>Login</Text>
                        </Button>
                        <Button
                            transparent
                            block
                            onPress={() => Actions.register()}
                        >
                            <Text>Não sou cadastrado</Text>
                        </Button>
                    </Form>
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
            //             onPress={() => Actions.register()}
            //         >
            //             Cadastre-se
            //         </Button>
            //         <Button
            //             onPress={this.onButtonPress.bind(this)}
            //         >
            //             Login
            //         </Button>
            //     </CardSection>
            //     <Spinner
            //         visible={this.props.loading}
            //     />
            // </Card>
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