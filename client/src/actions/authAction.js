import { REGISTER_SUCCESS, REGISTER_FAIL, FETCH_REGISTER } from '../constants/types';
import alertActions from '../actions/alertActions';
import axios from 'axios';

const registerAction = ({ name, email, password }) => async dispatch => {
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
  } catch (error) {
    const { errors } = error.response.data;
    errors.map(error => dispatch(alertActions(error.msg, 'danger')));

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export default registerAction;
