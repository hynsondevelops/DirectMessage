import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginContainer from './container/LoginContainer';
import RegisterContainer from './container/RegisterContainer';
import AlertContainer from './container/AlertContainer';
import AddFriendContainer from './container/AddFriendContainer';


class App extends Component {

  render() {
    return (
    	<div>
    	<AddFriendContainer />

    	 <AlertContainer />
	     <LoginContainer />
	     <RegisterContainer />
     	</div>
     )
  }
}

export default App;
