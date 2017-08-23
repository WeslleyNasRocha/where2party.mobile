import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from "redux-thunk";
import Firebase from 'firebase';
import Routers from './Routers';
import Reducers from './Reducers';

class App extends Component {

    componentWillMount() {
        const config = {
            apiKey: "AIzaSyAiceitFuCvdfw0xATK2FYRPgpVBkp9q4E",
            authDomain: "where2party-51f6a.firebaseapp.com",
            databaseURL: "https://where2party-51f6a.firebaseio.com",
            projectId: "where2party-51f6a",
            storageBucket: "where2party-51f6a.appspot.com",
            messagingSenderId: "519155446978"
        };
        Firebase.initializeApp(config);
        Firebase.initializeApp(config);        
    }

    render() {
        const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Routers />
            </Provider>
        );
    }
}

export default App;