import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="card w-25 m-auto">
				<img src={logo} className="App-logo card-img-top" alt="logo" />
				<div className="card-body">
					<h5 className="App-title card-title">Welcome to React</h5>
					<p className="App-intro card-text">
						To get started, edit <code>src/App.js</code> and save to reload.
					</p>
				</div>
      </div>
    );
  }
}

export default App;
