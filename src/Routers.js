import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import LoginForm from "./Components/Auth/LoginForm";
import RegisterForm from "./Components/Auth/RegisterForm";
import MainFeed from "./Components/Feed/MainFeed";
import Splash from "./Components/Splash";
import CreateEventForm from "./Components/Event/CreateEventForm";
import Maps from "./Components/Event/Map";
import feedPrincipal from "./Components/Feed/Feed.js";

import Configuracao from "./Components/Configure/Configuracao";

const Routers = () => {
  return (
    <Router hideNavBar={true}>
      <Scene key="root" hideNavBar>
        <Scene key="splash" initial component={Splash} hideNavBar />
        <Scene key="auth" hideNavBar>
          <Scene key="login" component={LoginForm} initial hideNavBar={true} />
          <Scene key="register" component={RegisterForm} hideNavBar={true} />
        </Scene>
        <Scene key="Feed">
          <Scene key="mainFeed" component={MainFeed} initial hideNavBar />
          <Scene key="createEvent" component={CreateEventForm} hideNavBar />
          <Scene key="map" component={Maps} hideNavBar />
          <Scene key="feedPrincipal" component={feedPrincipal} hideNavBar />
        </Scene>
        <Scene key="configuracao" component={Configuracao} hideNavBar />
      </Scene>
    </Router>
  );
};

export default Routers;
