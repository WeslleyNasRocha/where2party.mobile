import firebase from 'firebase';
import { FEED_EVENTS_FETCH_SUCCESS } from './Types';

export const eventsFetch = () => {
  return dispatch => {
    firebase
      .database()
      .ref('/eventos')
      .once('value', snapshot => {
        dispatch({ type: FEED_EVENTS_FETCH_SUCCESS, payload: snapshot.val() });
      })
      .catch(error => console.log(error));
  };
};
