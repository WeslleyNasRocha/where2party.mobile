import firebase from "firebase";
import { Actions } from "react-native-router-flux"
import { AsyncStorage } from 'react-native';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_ATTEMPT,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    CREATION_USER_ATTEMPT,
    CREATION_USER_FAILED,
    LOGGED_USER
} from './Types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginAttempt = ({ email, password }) => {
    console.log({ email, password });
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_ATTEMPT });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                console.log(user);
                loginUserSuccess(dispatch, user);
            })
            .catch((error) => {
                console.log(error);
                loginUserFail(dispatch);
            });
    };
};

export const createAttempt = ({ email, password }) => {
    console.log({ email, password });
    return (dispatch) => {
        dispatch({ type: CREATION_USER_ATTEMPT });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                loginUserSuccess(dispatch, user);
            })
            .catch((error) => {
                console.log(error);
                createUserFailed(error);
            });
    }
}

export const loggedUser = () => {
    return (dispatch) => {
        AsyncStorage.getItem("user_data")
            .then((user_data_json) => {
                let user_data = JSON.parse(user_data_json);
                if (user_data != null) {
                    dispatch({ type: LOGGED_USER })
                }
            })
    }

}

const createUserFailed = (error) => {
    dispatch({
        type: CREATION_USER_FAILED,
        payload: error
    })
}


const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    });
};

const loginUserSuccess = (dispatch, user) => {
    // console.log(user)
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    AsyncStorage.setItem("user_data", JSON.stringify(user));

    Actions.Feed({ type: "reset" });
}