import { EVENT_CREATED, FORM_VALUE_CHANGED } from './Types';

export const formValueChanged = ({ prop, value }) => {
    return {
        type: FORM_VALUE_CHANGED,
        payload: ({ prop, value })
    }
}

export const saveGpsLocation = ({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
    console.log({ latitude, longitude, latitudeDelta, longitudeDelta })
    return {
        type: "a"
    }
}


export const eventCreated = ({ titulo, descricao, local, tags, data }) => {
    console.log({ titulo, descricao, local, tags, data });
};
