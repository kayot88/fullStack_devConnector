import {
  GET_PROFILE,
  PROFILE_ERROR,
  FETCH_PROFILE,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE
} from '../constants/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  errors: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    case CREATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        repos: [],
        loading: false
      };
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case FETCH_PROFILE:
      return {
        ...state,
        loading: true
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
};
