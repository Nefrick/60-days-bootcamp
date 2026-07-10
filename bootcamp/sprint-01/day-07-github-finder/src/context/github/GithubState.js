import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';

import { githubReducer } from './githubReducer';

import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SHOW_LOADING,
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}


const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);


//Search Github Users
  const searchUsers = async (text) => {
    showLoading(); // This will dispatch the SHOW_LOADING action, which should set loading to true in the reducer.
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
      dispatch({
        type: SEARCH_USERS,
        payload: res.data.items
      });

    } catch (err) {
      console.log(err);
    }
  };
    //Get Single Github User
  const getUser = async (username) => {
    showLoading();
    try {
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };
    //Clear Users from state
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // Get users repositories
    const getUserRepos = async (username) => {
    showLoading();
    try {
      const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
      dispatch({
        type: GET_REPOS,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };
    //Set Loading
    const showLoading = () => dispatch({ type: SHOW_LOADING });
   
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        clearUsers,
        showLoading,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;