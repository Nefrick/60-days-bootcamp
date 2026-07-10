import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SHOW_LOADING
  } from '../types';


  export const githubReducer = (state, action) => {
    switch(action.type) {
      case SEARCH_USERS:
        return {
          ...state,
          users: action.payload,
          loading: false
        };
      case GET_USER:
        return {
          ...state,
          user: action.payload,
          loading: false
        };
      case CLEAR_USERS:
        return {
          ...state,
          users: [],
          loading: false,
          showClear: false
        };
      case GET_REPOS:
        return {
          ...state,
          repos: action.payload,
          loading: false
        };
      case SHOW_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  };
