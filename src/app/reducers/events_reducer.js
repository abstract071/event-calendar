import _ from 'lodash';

import {
  ADD_EVENT,
  REMOVE_EVENT,
  FETCH_EVENTS
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_EVENT:
      return [...state, action.payload];
    case REMOVE_EVENT:
      return _.reject(state, { _id: action.payload });
    case FETCH_EVENTS:
      return [...action.payload];
  }

  return state;
}
