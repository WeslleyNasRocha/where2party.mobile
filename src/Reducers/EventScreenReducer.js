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
} from "../Actions/Types";

const EventScreenInitialState = {
  imgUrl: {},
  currentPosition: { latitude: 0, longitude: 0 },
  eventPosition: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  },
  route: {},
  routeData: {},
  sub: {},
  owner: false
};

export default (state = EventScreenInitialState, action) => {
  switch (action.type) {
    case EVENT_SCREEN_LOAD_IMAGE:
      return {
        ...state,
        imgUrl: action.payload
      };
    case EVENT_SCREEN_GET_CURRENT_POSITION:
      return {
        ...state,
        currentPosition: action.payload
      };
    case EVENT_SCREEN_GET_EVENT_POSITION:
      return {
        ...state,
        eventPosition: action.payload
      };
    case EVENT_SCREEN_GET_ROUTE:
      return {
        ...state,
        route: action.payload
      };
    case EVENT_SCREEN_GET_ROUTE_DATA:
      return {
        ...state,
        routeData: action.payload
      };
    case CHANGE_USER_SUBSCRIPTION:
      return {
        ...state,
        sub: action.payload
      };
    case SET_SUB:
      return {
        ...state,
        sub: action.payload
      };
    case EVENT_OWNER:
      return { ...state, owner: true };
    case CLEAN_STATE:
      return { ...EventScreenInitialState };
    default:
      return state;
  }
};
