import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FETCH_REGISTER,
  USER_LOADED,
  AUTH_ERROR,
  FETCH_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REMOVE_PROFILE
} from '../constants/types';



const initialState = {
  loading: false,
  isAuthorized: null,
  user: null,
  token: localStorage.getItem('token'),
  // errors: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
    case REMOVE_PROFILE:
      return {
        ...state,
        isAuthorized: false,
        user: null,
        token: localStorage.removeItem('token')
      };
    case FETCH_REGISTER:
    case FETCH_LOGIN:
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthorized: true
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        isAuthorized: false
      };
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthorized: true,
        user: action.payload
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        isAuthorized: false
        // errors: action.payload
      };

    default:
      return state;
  }
};



export default authReducer;
