import firebase from 'firebase';
import { FEED_EVENTS_FETCH_SUCCESS, REFRESHING_FEED } from './Types';

export const eventsFetch = () => dispatch => {
    dispatch({ type: REFRESHING_FEED });
    firebase
      .database()
      .ref('/eventos')
      .orderByChild("Titulo").startAt("A").endAt("Z")
      .once('value', snapshot => {
        dispatch({ type: FEED_EVENTS_FETCH_SUCCESS, payload: snapshot.val() });
        // console.log(snapshot.val());
      })
      .catch(error => console.log(error));
  };
  