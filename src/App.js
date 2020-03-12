import React from "react";
import io from "socket.io-client";

// import Welcome from "./Welcome.js";
import LoginForm from "./LoginForm.js";

import "./styles/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.socket = io("localhost:8080");
  }

  signIn(username) {
    this.setState({
      user: username
    });

    this.socket.emit("USER_CONNECTED", {
      connectedUser: username
    });
  }

  render() {
    return (
      <div>
        {this.state.user ? (
          //   <Welcome />
          <div> Hello {this.state.user} </div>
        ) : (
          <LoginForm onSignIn={this.signIn.bind(this)} />
        )}
      </div>
    );
  }
}

export default App;
