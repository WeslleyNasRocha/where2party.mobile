import firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_ATTEMPT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CREATION_USER_ATTEMPT,
  CREATION_USER_FAILED,
  LOGGED_USER,
  BACK_FORM,
  LOGOUT
} from './Types';

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text
});

export const loginAttempt = ({ email, password }) => dispatch => {
  dispatch({ type: LOGIN_USER_ATTEMPT });

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
      loginUserSuccess(dispatch, user);
    })
    .catch(error => {
      console.log(error);
      loginUserFail(dispatch);
    });
};

export const createAttempt = ({ email, password }) => dispatch => {
  dispatch({ type: CREATION_USER_ATTEMPT });

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      loginUserSuccess(dispatch, user);
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: CREATION_USER_FAILED,
        payload: error.message
      });
    });
};

export const backForm = () => dispatch => {
  dispatch({
    type: BACK_FORM
  });
  Actions.pop();
};

export const loggedUser = () => dispatch => {
  AsyncStorage.getItem('user_data').then(user_data_json => {
    const user_data = JSON.parse(user_data_json);
    if (user_data != null) {
      dispatch({ type: LOGGED_USER });
    }
  });
};

const loginUserFail = dispatch => {
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

  AsyncStorage.setItem('user_data', JSON.stringify(user));

  console.log(JSON.stringify(user));

  firebase
    .database()
    .ref('usersProfiles')
    .once('value')
    .then(snapshot => {
      console.log(snapshot);
      if (snapshot.child(`${user.uid}`).exist()) {
        Actions.Feed({ type: 'reset' });
      } else {
        Actions.Profile({ type: 'reset' });
      }
    });
};

export const logout = () => dispatch => {
  AsyncStorage.removeItem('user_data').then(() => {
    dispatch({ type: LOGOUT });
    Actions.auth(ActionConst.RESET);
  });
};
