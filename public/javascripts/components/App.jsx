import React, {Component, PropTypes} from 'react';
import GroupSection from './groups/GroupSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import UserForm from './users/UserForm.jsx';

import utils from '../utils';
import $ from 'jquery';
import fecha from 'fecha';

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
  addGroup(group) {
    const { groups } = this.state;
    groups.push({ id: group.id, name: group.name });
    this.setState({ groups });
  }
  setGroup(activeGroup) {
    console.log(activeGroup)

    $.ajax({
       url: `group/api/getgroup/${activeGroup._id}`,
       type: "GET",
    }).done((group) => {
      console.log(group)
      this.setState({ activeGroup: group, messages: group.messages });
    }).fail((err) => {
      console.log('error', err)
    });
  }
  setUserName(user) {
    const { users } = this.state;
    const currentUser = { id: user._id, username: user.username }
    users.push(currentUser);
    this.setState({ users, currentUser });
  }
  addMessage(newMessage, activeGroup) {
    const { messages, users } = this.state;
    let createdAt = new Date;
    createdAt = fecha.format(createdAt, 'HH:mm:ss MM/DD/YYYY');
    const author = this.state.currentUser;
    const messageObject = { body: newMessage, createdAt, author };
    $.ajax({
       url: `group/api/newmessage/${activeGroup._id}`,
       type: "POST",
       data: {data: JSON.stringify(messageObject)},
    }).done((changedMessages) => {
      console.log(changedMessages, 'jjjj')
      // messages.push(message);
      this.setState({ messages: changedMessages });
    }).fail((err) => {
      console.log('error', err)
    });
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
            <UserForm {...this.props } setUserName={this.setUserName.bind(this)} />
          </div>
      }
      </div>
    )
  }
}

export default App;
