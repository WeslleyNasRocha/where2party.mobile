import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from "redux-thunk";
import Firebase from 'firebase';
import { StyleProvider } from 'native-base';
import Routers from './Routers';
import Reducers from './Reducers';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/commonColor';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            config: false
        }
    }

    componentWillMount = () => {
        const config = {
            apiKey: "AIzaSyAiceitFuCvdfw0xATK2FYRPgpVBkp9q4E",
            authDomain: "where2party-51f6a.firebaseapp.com",
            databaseURL: "https://where2party-51f6a.firebaseio.com",
            projectId: "where2party-51f6a",
            storageBucket: "where2party-51f6a.appspot.com",
            messagingSenderId: "519155446978",
            name: "where2partyAndroid"
        };
        if (!Firebase.apps.length) {
            Firebase.initializeApp(config);
        }
    }


    render() {
        const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <StyleProvider style={getTheme(material)}>
                    <Routers />
                </StyleProvider>
            </Provider>
        );
    }
}

export default App;