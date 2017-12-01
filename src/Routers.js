import React from 'react';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import LoginForm from './Components/Auth/LoginForm';
import RegisterForm from './Components/Auth/RegisterForm';
import MainFeed from './Components/Feed/MainFeed';
import Splash from './Components/Splash';
import CreateEventForm from './Components/Event/CreateEventForm';
import Maps from './Components/Event/Map';
import feedPrincipal from './Components/Feed/Feed.js';

import Configuracao from './Components/Configure/Configuracao';

import EventScreen from './Components/Event/EventScreen';
import EditEvent from './Components/Event/EditEvent';

import EditProfile from './Components/Profile/ProfileEdit';
import SearchMap from './Components/Event/Components/SearchMap';

const Routers = () => (
  <Router hideNavBar>
    <Scene key="root" hideNavBar>
      <Scene key="splash" initial component={Splash} hideNavBar />
      <Scene key="auth" hideNavBar type={ActionConst.RESET}>
        <Scene key="login" component={LoginForm} initial hideNavBar />
        <Scene key="register" component={RegisterForm} hideNavBar />
      </Scene>
      <Scene key="Feed" type={ActionConst.RESET}>
        <Scene key="mainFeed" component={MainFeed} initial hideNavBar />
        <Scene key="createEvent" component={CreateEventForm} hideNavBar />
        <Scene key="map" component={Maps} hideNavBar />
        <Scene key="feedPrincipal" component={feedPrincipal} hideNavBar />
      </Scene>
      <Scene key="EventHolder" hideNavBar>
        <Scene key="EventScreen" initial component={EventScreen} hideNavBar />
        <Scene key="EditEvent" component={EditEvent} hideNavBar />
      </Scene>
      <Scene key="SearchMap" component={SearchMap} hideNavBar />
      <Scene key="Profile" hideNavBar>
        <Scene key="ProfileEdit" hideNavBar component={EditProfile} />
      </Scene>
      <Scene key="configuracao" component={Configuracao} hideNavBar />
    </Scene>
  </Router>
);

export default Routers;
