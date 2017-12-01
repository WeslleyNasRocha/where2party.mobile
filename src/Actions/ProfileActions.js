import Firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import {
  CHANGE_PROFILE_IMAGE,
  PROFILE_IMAGE_OVERSIZED,
  CHANGE_PROFILE_FIELD,
  PROFILE_UPDATE_ATTEMPT,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_DATA_FETCH
} from './Types';

export const profileImageChange = ({ path, size, data, mime }) => {
  if (size <= 1048576) {
    return {
      type: CHANGE_PROFILE_IMAGE,
      payload: { path, base64: data, mime }
    };
  }
  return { type: PROFILE_IMAGE_OVERSIZED };
};

export const saveProfile = ({ ProfileImagePath, ProfileImageMime, UserName, LastName }) => {
  // console.log({ ProfileImagePath, ProfileImageMime, UserName, LastName });
  const path = ProfileImagePath.replace('file://', '');
  const user = Firebase.auth().currentUser.uid;
  return dispatch => {
    dispatch({
      type: PROFILE_UPDATE_ATTEMPT
    });

    const polyfill = RNFetchBlob.polyfill;

    window.XMLHttpRequest = polyfill.XMLHttpRequest;
    window.Blob = polyfill.Blob;

    const rnfbURI = RNFetchBlob.wrap(path);
    let image = `${user}++${Date.now().toString()}`;

    switch (ProfileImageMime) {
      case 'image/png':
        image += '.png';
        break;
      case 'image/jpeg':
        image += '.jpeg';
        break;
      case 'image/jpg':
        image += '.jpg';
        break;
      default:
        console.log(`Error: Image type: ${ProfileImageMime}`);
        return { type: null };
    }

    // console.log(image);

    Blob.build(rnfbURI, { type: `${ProfileImageMime}` }).then(blob => {
      Firebase.storage()
        .ref(`usersProfiles/${user}`)
        .child(`${image}`)
        .put(blob, { contentType: `${ProfileImageMime}` })
        .then(() => {
          Firebase.database()
            .ref(`usersProfiles/${user}`)
            .set({
              UserName,
              LastName,
              image
            })
            .then(() => {
              dispatch({
                type: PROFILE_UPDATE_SUCCESS
              });
              Actions.Feed();
            })
            .catch(error => console.log(error));
          blob.close();
        })
        .catch(error => console.log(error));
    });
  };
};

export const changeField = ({ prop, value }) => ({
  type: CHANGE_PROFILE_FIELD,
  payload: { prop, value }
});

export const getProfile = uid =>
  //console.log(uid);

  dispatch => {
    Firebase.app()
      .database()
      .ref('usersProfiles')
      .child(uid)
      .once('value')
      .then(snapshot => {
        //console.log(snapshot.val());
        const UserName = snapshot.val().UserName;
        const LastName = snapshot.val().LastName;
        const ImagePath = snapshot.val().image;
        Firebase.storage()
          .ref(`usersProfiles/${uid}`)
          .child(`${ImagePath}`)
          .getDownloadURL()
          .then(url => {
            // console.log(`url da imagem: ${url}`);
            dispatch({ type: PROFILE_DATA_FETCH, payload: { uri: url, UserName, LastName } });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };
