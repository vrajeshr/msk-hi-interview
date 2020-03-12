
import React from "react";
import Message from './Message'

import './styles/chatpanel.css'

class MessageFeed extends React.Component {
  scrollToBottom = () => {
    if (this.messagesEnd !== undefined) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="messageContainer">
        {this.props.messageFeed.map(item => {
          return (
            <>
              <div className="messageFeed">
                <Message key={item.messageID} user={item.user} message={item.message} sender={this.props.userID} />
              </div>
              <div
                ref={el => {
                  this.messagesEnd = el;
                }}
              ></div>
            </>
          );
        })}
      </div>
    );
  }
}

export default MessageFeed;
