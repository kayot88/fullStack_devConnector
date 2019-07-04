import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  FETCH_PROFILE,
  // CLEAR_PROFILE
} from '../constants/types';
import { setHeaderToken } from '../utils/setHeaderToken';

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
    console.log(res);
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
