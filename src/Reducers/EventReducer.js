import {
  EVENT_CREATED,
  EVENT_CREATE_ATTEMPT,
  FORM_VALUE_CHANGED,
  SAVE_GPS_LOCALE,
  CONVERT_GPS_TO_ADDRESS,
  DATE_TIME_STATUS,
  DATE_TIME_CONFIRMED
} from "../Actions/Types";

const EventInitialState = {
  Titulo: "",
  Descricao: "",
  Local: null,
  Address: "",
  Tags: [],
  Data: "",
  StatusDateTime: false,
  Loading: false
};
export default (Event = (state = EventInitialState, action) => {
  console.log(state);
  switch (action.type) {
    case FORM_VALUE_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
    case SAVE_GPS_LOCALE:
      return {
        ...state,
        Local: action.payload
      };
    case CONVERT_GPS_TO_ADDRESS:
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
    default:
      return state;
  }
});
