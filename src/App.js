import React from "react";
import io from "socket.io-client";

import Welcome from './Welcome';
import LoginForm from "./LoginForm.js";

import "./styles/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userList: [],
      currentID: -1
    };

    this.socket = io("localhost:8080");

    this.socket.on("CHATROOM_UPDATE", (activeUserList, recievedID) => {
      this.setState({
        userList: [...activeUserList],
        currentID: recievedID
      });
    });
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
          <Welcome
            currentUser={this.state.user}
            userList={this.state.userList}
            socket={this.socket}
            userID={this.state.currentID}
          />
        ) : (
          <LoginForm onSignIn={this.signIn.bind(this)} />
        )}
      </div>
    );
  }
}

export default App