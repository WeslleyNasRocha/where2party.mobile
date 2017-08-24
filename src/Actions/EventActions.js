import { Actions } from 'react-native-router-flux';
import Geocoder from "react-native-geocoding";
import { EVENT_CREATED, FORM_VALUE_CHANGED, SAVE_GPS_LOCALE, CONVERT_GPS_TO_ADDRESS } from './Types';

export const formValueChanged = ({ prop, value }) => {
    return {
        type: FORM_VALUE_CHANGED,
        payload: ({ prop, value })
    }
}

export const saveGpsLocation = ({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
    console.log({ latitude, longitude, latitudeDelta, longitudeDelta });
    return (dispatch) => {
        dispatch({
            type: SAVE_GPS_LOCALE,
            payload: ({ latitude, longitude, latitudeDelta, longitudeDelta })
        });
        Geocoder.setApiKey('AIzaSyBTTaiFxUaKyVkUhCWLgjzAb46WHylI_YI'); // use a valid API key 


        console.log(Geocoder);
        Geocoder.getFromLatLng(latitude, longitude).then(
            json => {
                dispatch({
                    type: CONVERT_GPS_TO_ADDRESS,
                    payload: json.results[0].formatted_address
                })
                Actions.pop();
            },
            error => {
                console.log(error);
            }
        );

    }
}


export const eventCreated = ({ titulo, descricao, local, tags, data }) => {
    console.log({ titulo, descricao, local, tags, data });
};
