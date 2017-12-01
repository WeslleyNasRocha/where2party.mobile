import {
  PASSWORD_CHANGED,
  EMAIL_CHANGED,
  LOGIN_USER_ATTEMPT,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  CREATION_USER_ATTEMPT,
  CREATION_USER_FAILED,
  LOGGED_USER,
  BACK_FORM,
  LOGOUT
} from '../Actions/Types';

const AuthInitialState = {
  email: '',
  password: '',
  loading: false,
  error: '',
  user: null,
  logged: false
};
export default (state = AuthInitialState, action) => {
  switch (action.type) {
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload,
        error: ''
      };
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload,
        error: ''
      };
    case LOGIN_USER_ATTEMPT:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        password: '',
        loading: false,
        error: 'Usuario ou senha incorretos'
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...AuthInitialState,
        user: action.payload
      };
    case CREATION_USER_ATTEMPT:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case CREATION_USER_FAILED:
      return {
        ...state,
        ...AuthInitialState,
        error: action.payload,
        loading: false
      };
    case LOGGED_USER:
      return {
        ...state,
        logged: true
      };
    case BACK_FORM:
      return {
        ...state,
        ...AuthInitialState
      };
    case LOGOUT:
      return { ...AuthInitialState };
    default:
      return state;
  }
};
