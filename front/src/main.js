import React, { Component } from 'react';
import avatar from './asset/avatar.png';
import './css/login.css';

const axios = require('axios').default;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
    this.callLogin = this.callLogin.bind(this)
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="style.css" />
        <div className="login-box">
          <img src={avatar} className="avatar" alt="avatar" />
          <h1>Connexion</h1>
          <form>
            <p>username:</p>
            <input value={this.state.username} onChange={this._handleChange} type="text" name="username" placeholder="Enter username" id="username" />
            <p>Password</p>
            <input value={this.state.password} onChange={this._handleChange} type="password" name="password" placeholder="Enter password" id="password" />
          </form>
          <input type="submit" name="submit" defaultValue="Sign In" onClick={this.callLogin} />
        </div>
      </div>
    );
  }

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  callLogin(state) {
    var username = this.state.username;
    this.setState({ username: username });
    axios({
      method: 'POST',
      url: 'http://localhost:8080/authenticate',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("okay")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}

export default Login;