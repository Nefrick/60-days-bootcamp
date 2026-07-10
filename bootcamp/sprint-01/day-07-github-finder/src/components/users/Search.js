import React, { useState, useContext } from 'react';

import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {

    const { setAlert } = useContext(AlertContext);
    const { searchUsers, clearUsers, users } = useContext(GithubContext);
    const [text, setText] = useState('');

    const onChange = e => setText(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
          console.log('Please enter something');
            setAlert('Please enter something', 'light');
        } else {
            searchUsers(text);
            setText('');
        }
    };

    return (
      <div>
        <form onSubmit={onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={text}
            onChange={onChange}
          />
            <input
              type="submit"
              value="Search"
              className="btn btn-dark btn-block"
            />
        </form>
        {users.length > 0 && (
          <button onClick={clearUsers} 
          className="btn btn-light btn-block"
          >
            Clear
          </button>
        )}
      </div>
    )
  }

export default Search