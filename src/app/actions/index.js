import axios from 'axios';
import moment from 'moment';

import history from '../history';
import {
  AUTH_USER,
  ADD_EVENT,
  REMOVE_EVENT,
  FETCH_EVENTS
} from './types';

const ROOT_URL = 'http://localhost:3000';

export const signinUser = ({ email, password }) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
        history.push('/calendar');
      })
  };
};

export const fetchEvents = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    axios.get(`${ROOT_URL}/event${token}`)
      .then(({ data: { events } }) => {
        dispatch({
          type: FETCH_EVENTS,
          payload: events
        });
      });
  };
};

export const addEvent = ({ start, duration, title }) => {
  return dispatch => {
    const momentTime = moment(start, "HH:mm");
    start = (momentTime.hours() - 8) * 60 + momentTime.minutes();
    duration = parseInt(duration);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    axios.post(`${ROOT_URL}/event${token}`, { start, duration, title })
      .then(({ data: { event: { _id, start, duration, title, cevc, hindex } } }) => {
        dispatch({
          type: ADD_EVENT,
          payload: { _id, start, duration, title, cevc, hindex }
        });
      });
  };
};

export const removeEvent = (id) => {
  return dispatch => {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    axios.delete(`${ROOT_URL}/event/${id}${token}`)
      .then((response) => {
        dispatch({ type: REMOVE_EVENT, payload: id });
      });
  };
};