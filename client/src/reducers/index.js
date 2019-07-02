import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import registerReducer from './authReducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: registerReducer
});

export default rootReducer;
