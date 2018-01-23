import {
  AUTH_USER
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
  }

  return state;
}
