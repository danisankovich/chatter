import React, {Component, PropTypes} from 'react';
import GroupSection from './groups/GroupSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import UserForm from './users/UserForm.jsx';

const iosocket = io.connect()

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
    $.ajax({
       url: 'group/api/',
       type: "GET",
    }).done((groups) => {
      this.setState({ groups });
    }).fail((err) => {
      console.log('error', err)
    });
    iosocket.on('connect', () => {
      console.log('connected');
      iosocket.emit('userentered', this.state.currentUser);
      console.log(this.state.currentUser)
      iosocket.on('userentered', (data) => {
        this.setState({users: data})
      });
      // const found = this.state.users.find((user) => {
      //   return user._id === this.state.currentUser._id;
      // })
      // if (!found) {
      //   console.log('new user in room');
      //   this.state.users.push()
      // }
      iosocket.on('message', (data) => {
        if (this.state.activeGroup && data.activeGroup._id === this.state.activeGroup._id) {
          this.state.messages.push(data.messageObject);
          this.setState({messages: this.state.messages})
        }
      });
      // iosocket.on('enterChatRoom', (data) => {
      //   console.log(data);
      //   if (this.state.activeGroup && data.activeGroup._id === this.state.activeGroup._id) {
      //     this.state.users.push(data.user);
      //     this.setState({users: this.state.users})
      //     iosocket.emit('updateChatRoom', {users: this.state.users, activeGroup: data.activeGroup});
      //   }
      // });
      // iosocket.on('updateChatRoom', (data) => {
      //   console.log(this.state);
      //   if (data.activeGroup._id !== this.state.activeGroup._id) {
      //     console.log(this.state.users);
      //   }
      //   this.setState({users: data.users})
      // });
      iosocket.on('disconnect', () => {
        console.log('disconnected')
      });
    });
  }

  addGroup(group) {
    const { groups } = this.state;
    groups.push({ _id: group.id, name: group.name });
    this.setState({ groups });
  }
  setGroup(activeGroup) {
    $.ajax({
       url: `group/api/getgroup/${activeGroup._id}`,
       type: "GET",
    }).done((group) => {
      this.setState({ activeGroup: group, messages: group.messages });
      iosocket.emit('enterChatRoom', {activeGroup, user: this.state.currentUser})
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
