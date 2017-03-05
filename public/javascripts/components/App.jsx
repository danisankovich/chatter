import React, {Component, PropTypes} from 'react';

const iosocket = io.connect()

import utils from '../utils';
import $ from 'jquery';
import fecha from 'fecha';
import { uniqBy } from 'lodash';

import GroupSection from './groups/GroupSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import UserForm from './users/UserForm.jsx';


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

    this.getCurrentuser();
    this.getGroupList();

    iosocket.on('connect', () => {
      iosocket.on('message', (data) => {
        if (this.state.activeGroup && data.activeGroup._id === this.state.activeGroup._id) {
          this.state.messages.push(data.messageObject);
          this.setState({messages: this.state.messages})
        }
      });
      iosocket.on('enter', (list) => {
        const users = _.map(list, user => user);

        if (this.state.currentUser) {
          const currentUserAdded = users.find((user) => {
            return user.username === this.state.currentUser.username;
          });
          if (!currentUserAdded) users.push(this.state.currentUser);
        }
        this.setState({ users: uniqBy(users, 'id') })
      })
      iosocket.on('newgroup', () => {
        this.getGroupList();
      })
      iosocket.on('disconnect', () => {
        console.log('disconnected')
      });
    });
  }
  getCurrentuser() {
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
  getGroupList() {
    $.ajax({
       url: 'group/api/',
       type: "GET",
    }).done((groups) => {
      this.setState({ groups });
    }).fail((err) => {
      console.log('error', err)
    });
  }
  addGroup(group) {
    const { groups } = this.state;
    groups.push({ _id: group.id, name: group.name });
    this.setState({ groups });
    iosocket.emit('newgroup', {});
  }
  setGroup(activeGroup) {
    $.ajax({
       url: `group/api/getgroup/${activeGroup._id}`,
       type: "GET",
    }).done((group) => {
      this.setState({ activeGroup: group, messages: group.messages });
      // iosocket.emit('enterChatRoom', {activeGroup, user: this.state.currentUser})
    }).fail((err) => {
      console.log('error', err)
    });
  }
  setUserName(user) {
    const { users } = this.state;
    const currentUser = { id: user._id, username: user.username }
    users.push(currentUser)
    console.log(currentUser)
    iosocket.emit('enter', currentUser);
    this.setState({ currentUser, users: uniqBy(users, 'id') });
    console.log(this.state.users,'kkkkkkk')
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
      this.setState({ messages: changedMessages });
    }).fail((err) => {
      console.log('error', err)
    });
    iosocket.emit('message', {messageObject, activeGroup})
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
