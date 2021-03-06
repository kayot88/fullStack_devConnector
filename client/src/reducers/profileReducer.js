import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  FETCH_PROFILE,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  REMOVE_PROFILE
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
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
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
    case DELETE_EXPERIENCE:
    case DELETE_EDUCATION:
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
