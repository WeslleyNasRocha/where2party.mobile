import { FEED_EVENTS_FETCH_SUCCESS } from '../Actions/Types';

const FeedInitialState = {};

export default (state = FeedInitialState, action) => {
  switch (action.type) {
    case FEED_EVENTS_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
