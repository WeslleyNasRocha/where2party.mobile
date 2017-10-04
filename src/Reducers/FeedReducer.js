import _ from "lodash";
import { FEED_EVENTS_FETCH_SUCCESS, REFRESHING_FEED } from "../Actions/Types";

const FeedInitialState = {
  events: null,
  refreshing: false
};

export default (state = FeedInitialState, action) => {
  switch (action.type) {
    case FEED_EVENTS_FETCH_SUCCESS:
      const a = _.map(action.payload, (val, uid) => {
        return { uid: uid, ...val };
      });
      return { ...state, events: a, refreshing: false };
    case REFRESHING_FEED:
      return { ...state, refreshing: true };
    default:
      return state;
  }
};
