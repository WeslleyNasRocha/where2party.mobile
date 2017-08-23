import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from "./Components/Auth/LoginForm";
import RegisterForm from "./Components/Auth/RegisterForm";
import MainFeed from "./Components/Feed/MainFeed";
import Splash from "./Components/Splash";

const Routers = () => {
    return (
        <Router hideNavBar={true} >
            <Scene key="root" hideNavBar>
                <Scene
                    key="splash"
                    initial
                    component={Splash}
                    hideNavBar
                />
                <Scene key="auth" hideNavBar>
                    <Scene
                        key="login"
                        component={LoginForm}
                        title="Porfavor Logue-se"
                        initial
                        hideNavBar={true}
                    />
                    <Scene
                        key="register"
                        component={RegisterForm}
                        title="Preencha o cadastro"
                        hideNavBar={true}
                    />
                </Scene>
                <Scene key="Feed">
                    <Scene
                        key="mainFeed"
                        component={MainFeed}
                        title="feed"
                        initial
                        hideNavBar
                    />
                </Scene>
            </Scene>
        </Router>
    );
}


export default Routers;