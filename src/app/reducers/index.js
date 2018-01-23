import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './auth_reducer';
import eventsReducer from './events_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  events: eventsReducer
});

export default rootReducer;