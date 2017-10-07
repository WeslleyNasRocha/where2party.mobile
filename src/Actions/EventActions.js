import { Actions } from 'react-native-router-flux';
import Geocoder from 'react-native-geocoding';
import Firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import {
  EVENT_CREATED,
  EVENT_CREATE_ATTEMPT,
  FORM_VALUE_CHANGED,
  SAVE_GPS_LOCALE,
  CONVERT_GPS_TO_ADDRESS,
  DATE_TIME_STATUS,
  DATE_TIME_CONFIRMED,
  CANCEL_FORM_EVENT,
  EVENT_IMAGE_CHANGE,
  EVENT_IMAGE_OVERSIZE,
  EVENT_SCREEN_LOAD_IMAGE
} from './Types';

export const formValueChanged = ({ prop, value }) => ({
  type: FORM_VALUE_CHANGED,
  payload: { prop, value }
});

export const saveGpsLocation = ({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
  Address
}) => {
  console.log({ latitude, longitude, latitudeDelta, longitudeDelta });
  return dispatch => {
    dispatch({
      type: SAVE_GPS_LOCALE,
      payload: { latitude, longitude, latitudeDelta, longitudeDelta }
    });

    dispatch({
      type: CONVERT_GPS_TO_ADDRESS,
      payload: Address
    });
    Actions.pop();
  };
};

export const eventCreated = ({
  Titulo,
  Address,
  Local,
  Descricao,
  Tags,
  Data,
  ImageData,
  ImagePath,
  ImageMime
}) => {
  console.log({
    path,
    Titulo,
    Address,
    Descricao,
    Tags,
    Local,
    Data,
    ImagePath,
    ImageData,
    ImageMime
  });
  const path = ImagePath.replace('file://', '');
  const user = Firebase.auth().currentUser.uid;
  return dispatch => {
    dispatch({
      type: EVENT_CREATE_ATTEMPT
    });

    const polyfill = RNFetchBlob.polyfill;

    window.XMLHttpRequest = polyfill.XMLHttpRequest;
    window.Blob = polyfill.Blob;

    const rnfbURI = RNFetchBlob.wrap(path);
    let image = `${user}++${Date.now().toString()}`;

    switch (ImageMime) {
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
        console.log(`Error: Image type: ${ImageMime}`);
        return { type: null };
    }

    console.log(image);

    Blob.build(rnfbURI, { type: `${ImageMime}` }).then(blob => {
      Firebase.storage()
        .ref('eventImages')
        .child(`${image}`)
        .put(blob, { contentType: `${ImageMime}` })
        .then(() => {
          Firebase.database()
            .ref('eventos')
            .push({
              Titulo,
              Address,
              Descricao,
              Tags,
              Local,
              Data,
              orgId: user,
              image
            })
            .then(() => {
              dispatch({
                type: EVENT_CREATED
              });
              Actions.pop();
            })
            .catch(error => console.log(error));
          blob.close();
        })
        .catch(error => console.log(error));
    });
  };
};

export const dateTimeModalStatus = status => ({
  type: DATE_TIME_STATUS,
  payload: status
});

export const dateTimeConfirm = date => {
  const data = new Date(date);

  return {
    type: DATE_TIME_CONFIRMED,
    payload: data.toLocaleDateString('pt-BR')
  };
};

export const eventImageChange = ({ path, size, data, mime }) => {
  if (size <= 1048576) {
    return { type: EVENT_IMAGE_CHANGE, payload: { path, base64: data, mime } };
  }
  return { type: EVENT_IMAGE_OVERSIZE };
};

export const cancelForm = () => ({
  type: CANCEL_FORM_EVENT
});
