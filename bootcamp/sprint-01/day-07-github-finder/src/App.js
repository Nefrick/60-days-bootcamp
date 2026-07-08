import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { About } from './components/pages/About';
import axios from 'axios';
import React, { Component, Fragment } from 'react';

class App extends Component {

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  searchUsers = async (text) => {
    this.setState({ loading: true });
     try {
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      console.log(res.data.items);
      this.setState({ users: res.data.items, loading: false, alert: null });
    } catch (err) {
      console.log(err);
    }
  }
   
  //Get Single Github User
  getUser = async (username) => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      console.log(res.data);
      this.setState({ user: res.data, loading: false });
    } catch (err) {
      console.log(err);
    }
  };

  //Clear Users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false, alert: null });
  };
  
  // Get users repositories
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      this.setState({ repos: res.data, loading: false });
    } catch (err) {
      console.log(err);
    }
  };


  //Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, user, loading, repos } = this.state;
    return (
      <Router>
      <div className="App">
        <Navbar title="GitHub Finder" icon="fab fa-github" />
        <div className="container"> 
          {this.state.alert && <Alert alert={this.state.alert} />}
          <Routes>
            <Route
              path='/'
              element={
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users users={users} loading={loading} />
                </Fragment>
              }
            />
            <Route path='/about' element={<About />} />
            <Route path='/user/:login' element={
              <User 
              getUser={this.getUser}
              getUserRepos={this.getUserRepos}
              user={user}
              repos={repos}
              loading={loading} />
              } />
          </Routes>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
