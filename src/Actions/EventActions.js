import { Actions } from 'react-native-router-flux';
import Geocoder from "react-native-geocoding";
import Firebase from "firebase"
import {
    EVENT_CREATED,
    EVENT_CREATE_ATTEMPT,
    FORM_VALUE_CHANGED,
    SAVE_GPS_LOCALE,
    CONVERT_GPS_TO_ADDRESS,
    DATE_TIME_STATUS,
    DATE_TIME_CONFIRMED
} from './Types';

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


export const eventCreated = ({ Titulo, Address, Local, Descricao, Tags, Data }) => {
    console.log({ Titulo, Address, Descricao, Tags, Local, Data });
    return (dispatch) => {
        dispatch({
            type: EVENT_CREATE_ATTEMPT
        });
        Firebase.database().ref("eventos")
            .push({ Titulo, Address, Descricao, Tags, Local, Data })
            .then(
            dispatch({
                type: EVENT_CREATED
            })
            )
            .catch(
            (error) => console.log(error)
            );
    }
};

export const dateTimeModalStatus = (status) => {
    return ({
        type: DATE_TIME_STATUS,
        payload: status
    })
}

export const dateTimeConfirm = (date) => {

    const data = new Date(date);

    return ({
        type: DATE_TIME_CONFIRMED,
        payload: data.toLocaleDateString("pt-BR")
    })
}
