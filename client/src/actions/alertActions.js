import { SET_ALERT, REMOVE_ALERT } from '../constants/types';
import uuid from 'uuid';

const addAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  }, 5000);
};

export default addAlert