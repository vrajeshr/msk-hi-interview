import React from "react";

import "./styles/welcome.css";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: "",
      currentUserList: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUserList: nextProps.userList
    });
  }

  render() {
    return (
      <>
        <div className="currentlyActive">
          Active Users :
          {this.state.currentUserList.map(element => {
            return (
              <div className="activeUser" key={element.id}>
                {element.user}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default UserList;
