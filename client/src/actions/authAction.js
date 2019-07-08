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
  CLEAR_PROFILE
} from '../constants/types';
import { setHeaderToken } from '../utils/setHeaderToken';
import alertActions from '../actions/alertActions';
import axios from 'axios';

export const authUser = () => async dispatch => {
  // dispatch({
  //   type: FETCH_USER
  // });

  const token = localStorage.getItem('token');
  if (token) {
    setHeaderToken(token);
  }
  try {
    const res = await axios.get('/api/auth');
    const user = {
      name: res.data.name,
      avatar: res.data.avatar,
      email: res.data.email,
      id: res.data._id
    };
    dispatch({
      type: USER_LOADED,
      payload: user
    });

    // console.log(res.data);
  } catch (error) {
    console.error(error.response.data);
    dispatch(alertActions(error.response.data.msg, 'danger'));
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data
    });
  }
};

export const registerAction = ({ name, email, password }) => async dispatch => {
  dispatch({
    type: FETCH_REGISTER
  });
  try {
    const newUser = {
      name,
      email,
      password
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(newUser);
    const res = await axios.post('/api/users/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(authUser());
  } catch (error) {
    const { errors } = error.response.data;
    errors.map(error => dispatch(alertActions(error.msg, 'danger')));

    dispatch({
      type: REGISTER_FAIL,
      payload: errors
    });
  }
};

export const loginAction = ({ email, password }) => async dispatch => {
  dispatch({
    type: FETCH_LOGIN
  });
  try {
    const loginUser = {
      email,
      password
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(loginUser);
    const res = await axios.post('/api/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(authUser());
  } catch (error) {
    console.log(error);
    const { errors } = error.response.data;
    // console.log(errors.response.data);
    // dispatch(alertActions(error.msg, 'danger'))
    errors.map(error => dispatch(alertActions(error.msg, 'danger')));

    dispatch({
      type: LOGIN_FAIL
      // payload: error
    });
  }
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
  dispatch({
    type: CLEAR_PROFILE
  });
};
