import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from "./Components/Auth/LoginForm";
import RegisterForm from "./Components/Auth/RegisterForm";
import MainFeed from "./Components/Feed/MainFeed"



class Routers extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="auth" initial>
                        <Scene
                            sceneStyle={{ justifyContent: "center" }}
                            key="login"
                            component={LoginForm}

                            title="Porfavor Logue-se"
                            initial
                        />
                        <Scene
                            sceneStyle={{ paddingTop: 50 }}
                            key="register"
                            component={RegisterForm}
                            title="Preencha o cadastro"
                        />
                    </Scene>
                    <Scene key="Feed">
                        <Scene
                            sceneStyle={{ paddingTop: 50 }}
                            key="mainFeed"
                            component={MainFeed}
                            title="feed"
                            initial
                        />
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

export default Routers;