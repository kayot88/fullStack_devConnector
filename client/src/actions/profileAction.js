import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  FETCH_PROFILE,
  CREATE_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE
} from '../constants/types';
import { setHeaderToken } from '../utils/setHeaderToken';
import alertActions from '../actions/alertActions';

export const addExperience = (formData, history) => async dispatch => {
  dispatch({
    type: FETCH_PROFILE
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put(
      '/api/profile/experience',
      formData,
      config
    );
    console.log(res);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    if (res.data) {
      dispatch(alertActions('experiences added', 'success'));
      history.push('/dashboard');
    }
  } catch (error) {
    const { errors } = error.response.data;
    errors.map(error => dispatch(alertActions(error.msg, 'danger')));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data }
    });
  }
};
export const addEducation = (formData, history) => async dispatch => {
  dispatch({
    type: FETCH_PROFILE
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put(
      '/api/profile/education',
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    if (res.data) {
      dispatch(alertActions('education added', 'success'));
      history.push('/dashboard');
    }
  } catch (error) {
    const { errors } = error.response.data;
    errors.map(error => dispatch(alertActions(error.msg, 'danger')));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data }
    });
  }
};


export const profileActions = () => async dispatch => {
  dispatch({
    type: FETCH_PROFILE
  });

  const token = localStorage.getItem('token');
  if (token) {
    setHeaderToken(token);
  }

  try {
    const res = await axios.get('/api/profile/me');
    // console.log(res);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data }
    });
  }
};

export const createProfileUpdate = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(
      alertActions(edit ? 'Profile updated' : 'Profile created', 'success')
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    const { errors } = error.response.data;
    errors.map(error => dispatch(alertActions(error.msg, 'danger')));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
