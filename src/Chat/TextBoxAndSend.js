import React from "react";
import './styles/chatpanel.css'

class TextAndSend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  handleMessageSend(event) {
    event.preventDefault();
    if(this.state.message.length === 0){
      alert("Message field cannot be 0")
      return
    }
    else{
      this.props.onSend(this.state.message);
      this.setState({
        message: ""
      });
    }
    
  }

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  render() {
    return (
      <div className="textAndSendContainer">
        <form onSubmit={this.handleMessageSend.bind(this)}>
          <div className='inputBoxContainer'>
              <input
                className="inputBox"
                type="text"
                value={this.state.message}
                onChange={this.handleChange.bind(this)}
              />
          </div>
          <div className='sendButtonContainer'>
            <input 
              className="sendButton"
              type="submit" value="Send" />
          </div>
          
        </form>
      </div>
    );
  }
}

export default TextAndSend
