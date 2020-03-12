import React from "react";
import MessageFeed from "./MessageFeed";
import TextAndSend from "./TextBoxAndSend";

import './styles/chatpanel.css'

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageLog: [],
      message: ""
    };

    this.props.socket.on("MESSAGE_LIST_UPDATE", data => {
      this.setState({
        messageLog: data
      });
      console.log(data)
    });
  }

  handleButtonSend = message => {
    this.props.socket.emit("MESSAGE_SENT", {
      message: message,
      user: this.props.activeUser,
      userID: this.props.userID
    });
  };

  render() {
    return (
      <div className="chatBox">
        <MessageFeed messageFeed={this.state.messageLog} currUser={this.props.userID} />
        <TextAndSend onSend={this.handleButtonSend.bind(this)} />
      </div>
    );
  }
}

export default ChatBox;
