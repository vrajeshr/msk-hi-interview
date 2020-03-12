import React from "react";
import UserList from "./UserList";
import ChatBox from "./Chat/Chatbox";

import "./styles/welcome.css";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: "",
      currentUserList: [],
      messageList: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loggedInUser: nextProps.currentUser,
      currentUserList: nextProps.userList,
      messageList: nextProps.messageList
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          <h3>
            Hello <b>{this.state.loggedInUser}</b>{" "}
          </h3>
        </div>
        <div className="container">
          <UserList userList={this.state.currentUserList} />
          <ChatBox
            messageList={this.state.messageList}
            activeUser={this.state.loggedInUser}
            socket={this.props.socket}
            userID={this.props.userID}
          />
        </div>
      </div>
    );
  }
}

export default Welcome;
