import React, {Component, PropTypes} from 'react';
import GroupSection from './groups/GroupSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import UserForm from './users/UserForm.jsx';

import utils from '../utils';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groups: [],
      messages: [],
      activeGroup: {},
    }
  }
  componentDidMount() {
    const token = localStorage.getItem('chatteruser')
    $.ajax({
       url: '/api/',
       type: "GET",
       headers: {
          "authorization": token
       }
    }).done((user) => {
      this.setUserName(user);
    }).fail((err) => {
      console.log('error', err)
    });
  }
  addGroup(groupName) {
    const { groups } = this.state;
    groups.push({ id: groups.length, name: groupName });
    this.setState({ groups });
  }
  setGroup(activeGroup) {
    this.setState({ activeGroup });
  }
  setUserName(user) {
    const { users } = this.state;
    const currentUser = { id: user._id, username: user.username }
    users.push(currentUser);
    console.log(users)
    this.setState({ users, currentUser });
  }
  addMessage(newMessage) {
    const { messages, users } = this.state;
    const createdAt = new Date;
    const author = this.state.currentUser;
    messages.push({ id: messages.length, body: newMessage, createdAt, author });
    this.setState({ messages });
    console.log(messages)
  }
  render() {
    const { group } = this.props
    return (
      <div>
      {
        this.state.currentUser &&
          <div className="app">
            <div className="nav">
              <GroupSection
                {...this.state}
                addGroup={this.addGroup.bind(this)}
                setGroup={this.setGroup.bind(this)}
              />
              <UserSection
                {...this.state}
              />
            </div>
            <MessageSection
              {...this.state}
              addMessage={this.addMessage.bind(this)}
            />
        </div>
      }
      {
        !this.state.currentUser &&
          <div>
            <UserForm {...this.props} setUserName={this.setUserName.bind(this)} />
          </div>
      }
      </div>
    )
  }
}

export default App;
