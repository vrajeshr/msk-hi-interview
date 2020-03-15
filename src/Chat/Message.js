import React from "react";

export default class Message extends React.Component {
  render() {
    return (
      <div className="message">
          <p className="usersName">
             {this.props.user}
          </p>
          <p className="usersMessage">
            {this.props.message}
          </p>
      </div>
    );
  }
}