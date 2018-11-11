import { combineReducers } from 'redux';
import loggedIn from './loggedInReducer';
import user from './userReducer';
import alerts from './alertsReducer'

export default combineReducers({
  user,
  alerts
})