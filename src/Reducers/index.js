import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EventReducer from './EventReducer';
import FeedReducer from './FeedReducer';

export default combineReducers({
  auth: AuthReducer,
  event: EventReducer,
  feed: FeedReducer
});
