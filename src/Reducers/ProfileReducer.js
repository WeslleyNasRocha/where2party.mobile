import {
  CHANGE_PROFILE_IMAGE,
  PROFILE_IMAGE_OVERSIZED,
  CHANGE_PROFILE_FIELD,
  PROFILE_UPDATE_ATTEMPT,
  PROFILE_UPDATE_SUCCESS
} from "../Actions/Types";

const INITIAL_STATE = {
  ProfileImagePath: "http://via.placeholder.com/200x200",
  ProfileImageData: "",
  Error: "",
  ProfileImageMime: "",
  UserName: "",
  LastName: "",
  Loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_PROFILE_IMAGE:
      //console.log(action.payload);
      return {
        ...state,
        ProfileImagePath: action.payload.path,
        ProfileImageData: action.payload.base64,
        ProfileImageMime: action.payload.mime
      };
    case PROFILE_IMAGE_OVERSIZED:
      return {
        ...state,
        ProfileImagePath: "http://via.placeholder.com/200x200",
        Error: "Arquivo muito grande"
      };
    case CHANGE_PROFILE_FIELD:
      console.log(action.payload);
      return { ...state, [action.payload.prop]: action.payload.value };
    case PROFILE_UPDATE_ATTEMPT:
      return { ...state, Loading: true };
    case PROFILE_UPDATE_SUCCESS:
      return { ...state, Loading: false };
    default:
      return state;
  }
};
