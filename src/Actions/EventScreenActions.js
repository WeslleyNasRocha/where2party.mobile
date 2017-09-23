import firebase from "firebase";
import {
  EVENT_SCREEN_LOAD_IMAGE,
  EVENT_SCREEN_GET_CURRENT_POSITION,
  EVENT_SCREEN_GET_EVENT_POSITION,
  EVENT_SCREEN_GET_ROUTE,
  EVENT_SCREEN_GET_ROUTE_DATA,
  CLEAN_STATE,
  CHANGE_USER_SUBSCRIPTION,
  SET_SUB,
  EVENT_OWNER
} from "./Types";

export const loadImages = imgUrl => {
  //console.log(imgUrl);
  return dispatch => {
    firebase
      .storage()
      .ref("eventImages")
      .child(`${imgUrl}`)
      .getDownloadURL()
      .then(url => {
        //console.log(`url da imagem: ${url}`);
        dispatch({ type: EVENT_SCREEN_LOAD_IMAGE, payload: { uri: url } });
      })
      .catch(error => console.log(error));
  };
};

export const getMap = eventLocale => {
  const { latitude, longitude } = eventLocale;
  // console.log(eventLocale);
  const mode = "driving"; // 'walking';
  let origin = "";
  const destination = `${latitude},${longitude}`;
  const APIKEY = "AIzaSyAvHbGWeOk-xrUhqyxQkWUMqHvrPOJcNDI";

  return dispatch => {
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position.coords);

      origin = `${position.coords.latitude},${position.coords.longitude}`;
      //console.log(origin);
      //   this.setState({
      //     initialRouteCoords: {
      //       latitude: position.coords.latitude,
      //       longitude: position.coords.longitude
      //     }
      //   });
      dispatch({
        type: EVENT_SCREEN_GET_CURRENT_POSITION,
        payload: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
      dispatch({
        type: EVENT_SCREEN_GET_EVENT_POSITION,
        payload: { latitude, longitude, latitudeDelta: 0, longitudeDelta: 0 }
      });
      // console.log(this.state.initialRouteCoords);

      // console.log(this.state.eventCoords);
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
      // console.log(url);
      fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.routes.length) {
            dispatch({
              type: EVENT_SCREEN_GET_ROUTE,
              payload: decodeRoute(
                responseJson.routes[0].overview_polyline.points
              )
            });
            dispatch({
              type: EVENT_SCREEN_GET_ROUTE_DATA,
              payload: {
                distance: responseJson.routes[0].legs[0].distance.text,
                duration: responseJson.routes[0].legs[0].duration.text
              }
            });
            // console.log(this.state.data);
          }
        })
        .catch(e => {
          console.warn(e);
        });
    });
  };
};

const decodeRoute = (t, e) => {
  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
  }
  return (d = d.map(function(t) {
    return { latitude: t[0], longitude: t[1] };
  }));
};

export const backToFeed = () => {
  return { type: CLEAN_STATE };
};

export const changeSubscription = (partyId, value) => {
  var userId = firebase.auth().currentUser.uid;
  return dispatch => {
    firebase
      .app()
      .database()
      .ref("subs/" + partyId)
      .child("users")
      .update({ [userId]: value })
      .then(dispatch({ type: CHANGE_USER_SUBSCRIPTION, payload: value }))
      .catch(error => console.log(error));
  };
};

export const getSubscription = partyId => {
  var userId = firebase.auth().currentUser.uid;
  return dispatch => {
    firebase
      .app()
      .database()
      .ref("subs/" + partyId)
      .child("users")
      .once("value")
      .then(snapshot => {
        let response = false;
        if (snapshot.val() != null) {
          const snap = snapshot.val();
          //console.log(snap);
          _.each(snap, (val, key) => {
            //console.log(key);
            //console.log(val);
            if (userId === key) {
              response = val;
            }
          });
        }
        dispatch({ type: SET_SUB, payload: response });
      })
      .catch(error => console.log(error));
  };
};

export const getOwner = orgId => {
  var userId = firebase.auth().currentUser.uid;
  return dispatch => {
    if (orgId === userId) {
      dispatch({ type: EVENT_OWNER });
    }
  };
};
