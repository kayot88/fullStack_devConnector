import { REGISTER_SUCCESS, REGISTER_FAIL } from '../constants/types';

const initialState = {
  loading: false,
  isAuthorized: null,
  user: null,
  token: localStorage.getItem('token')
};
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_REGISTER':
      return {
        ...state,
        loading: true
      };
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthorized: true
      };
    case 'REGISTER_FAIL':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        isAuthorized: false
      };

    default:
      return state;
  }
};

export default registerReducer;
