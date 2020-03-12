import React from "react";
import "./styles/login.css";

class LoginForm extends React.Component {
  handleSignIn(e) {
    e.preventDefault();
    
    if(this.refs.username.value.length === 0){
      alert("Username cannot be empty!")
      return
    }

    let username = this.refs.username.value;
    this.props.onSignIn(username);
  }

  render() {
    return (
      <div className="loginBox">
        <form onSubmit={this.handleSignIn.bind(this)}>
          <h3>What is your name?</h3>
          <input type="text" ref="username" placeholder="Enter your name" />
          <input type="submit" value="Login" />
          <br />
          <br />
        </form>
      </div>
    );
  }
}

export default LoginForm;
