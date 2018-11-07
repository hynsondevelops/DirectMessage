import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginContainer from './container/LoginContainer';
import RegisterContainer from './container/RegisterContainer';

class App extends Component {

  render() {
    return (
    	<div>
	     <LoginContainer />
	     <RegisterContainer />
     	</div>
     )
  }
}

export default App;
