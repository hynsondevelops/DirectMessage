import { combineReducers } from 'redux';
import loggedIn from './loggedInReducer';
import user from './userReducer';

export default combineReducers({
  loggedIn,
  user
})