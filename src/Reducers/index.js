import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import EventReducer from "./EventReducer";
import FeedReducer from "./FeedReducer";
import EvenScreenReducer from "./EventScreenReducer";
import ProfileReducer from "./ProfileReducer";

export default combineReducers({
  auth: AuthReducer,
  event: EventReducer,
  feed: FeedReducer,
  eventScreen: EvenScreenReducer,
  profile: ProfileReducer
});
