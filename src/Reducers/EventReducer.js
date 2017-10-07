import {
  EVENT_CREATED,
  EVENT_CREATE_ATTEMPT,
  FORM_VALUE_CHANGED,
  SAVE_GPS_LOCALE,
  CONVERT_GPS_TO_ADDRESS,
  DATE_TIME_STATUS,
  DATE_TIME_CONFIRMED,
  CANCEL_FORM_EVENT,
  EVENT_IMAGE_OVERSIZE,
  EVENT_IMAGE_CHANGE
} from '../Actions/Types';

const EventInitialState = {
  Titulo: '',
  Descricao: '',
  Local: null,
  Address: '',
  Tags: [],
  Data: '',
  ImagePath: 'http://via.placeholder.com/300x200',
  ImageData: '',
  Error: '',
  StatusDateTime: false,
  Loading: false,
  ImageMime: ''
};
export default (state = EventInitialState, action) => {
  switch (action.type) {
    case FORM_VALUE_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
    case SAVE_GPS_LOCALE:
      console.log(action.payload);
      return {
        ...state,
        Local: action.payload
      };
    case CONVERT_GPS_TO_ADDRESS:
      console.log(action.payload);
      return {
        ...state,
        Address: action.payload
      };
    case EVENT_CREATE_ATTEMPT:
      return {
        ...state,
        Loading: true
      };
    case EVENT_CREATED:
      return {
        ...state,
        ...EventInitialState
      };
    case DATE_TIME_STATUS:
      return {
        ...state,
        StatusDateTime: action.payload
      };
    case DATE_TIME_CONFIRMED:
      return {
        ...state,
        StatusDateTime: false,
        Data: action.payload
      };
    case EVENT_IMAGE_CHANGE:
      //console.log(action.payload);
      return {
        ...state,
        ImagePath: action.payload.path,
        ImageData: action.payload.base64,
        ImageMime: action.payload.mime
      };
    case EVENT_IMAGE_OVERSIZE:
      return {
        ...state,
        ImagePath: 'http://via.placeholder.com/300x200',
        Error: 'Arquivo muito grande'
      };
    case CANCEL_FORM_EVENT:
      return {
        ...state,
        ...EventInitialState
      };
    default:
      return state;
  }
};
