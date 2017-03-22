import React, {Component, PropTypes} from 'react';

const iosocket = io.connect()
import fecha from 'fecha';
import { uniqBy } from 'lodash';

import utils from '../public/javascripts/utils';

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
    // initial ajax calls
    this.getCurrentuser();

    //set up socket listeners
    iosocket.on('connect', () => {

      /*
        new message listener;
        on a new message, sends to all users in that chatroom
      */
      iosocket.on('message', (data) => {
        if (this.state.activeGroup && data.activeGroup._id === this.state.activeGroup._id) {
          this.state.messages.push(data.messageObject);
          this.setState({messages: this.state.messages})
        }
      });

      /*
        when a user is logged in, add them to the users list
      */
      iosocket.on('enter', (list) => {
        const users = _.map(list[this.state.activeGroup._id], user => user);

        if (this.state.currentUser) {
          const currentUserAdded = users.find((user) => {
            return user.username === this.state.currentUser.username;
          });
          if (!currentUserAdded) users.push(this.state.currentUser);
        }
        this.setState({ users: uniqBy(users, 'id') })
      })

      /*
        when a new group is created, all users lists update.
        will be used for when groups are removed as well
      */
      iosocket.on('newgroup', () => {
        this.getGroupList();
      })

      /*
        when a user logs out, remove them from users list
      */
      iosocket.on('userleft', (list) => {
        const users = _.map(list, user => user);
        this.setState({ users: uniqBy(users, 'id') })
      });

      /*
        a log to notify devs when a disconnect takes place
      */
      iosocket.on('disconnect', () => {
        console.log('disconnected')
      });
    });
  }

  // gets the user based off of a locally saved token, if it exists, automatically logging them in
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
      this.getGroupList();
    }).fail((err) => {
      console.log('error', err)
    });
  }

  //gets the list of all groups
  getGroupList() {
    const token = localStorage.getItem('chatteruser')

    $.ajax({
       url: 'group/api/',
       type: "GET",
       headers: {
          "authorization": token
       }
    }).done((groups) => {
      this.setState({ groups });
    }).fail((err) => {
      console.log('error', err)
    });
  }

  // when a new group is added, this is called to update the state and notify all channels
  addGroup(group) {
    const { groups } = this.state;
    groups.push({ _id: group.id, name: group.name, creatorId: group.creatorId });
    this.setState({ groups });
    iosocket.emit('newgroup', {});
  }
  deleteGroup(group, activeGroup) {
    const { groups } = this.state;

    const newgroups = groups.filter(function( obj ) {
      return obj._id !== group._id;
    });

    if (group._id === activeGroup._id) {
      this.setState({activeGroup: {}})
    }

    this.setState({ groups: newgroups });
    iosocket.emit('newgroup', {});
  }
  editGroup(group, activeGroup) {
    const { groups } = this.state;
    const newgroups = groups.map(function( obj ) {
      if (obj._id === group._id) {
        obj.name = group.newName;
      };
      return obj;
    });
    this.setState({ groups: newgroups });
    iosocket.emit('newgroup', {});
  }

  // sets the desired group as the current users active/open group
  setGroup(activeGroup) {
    const token = localStorage.getItem('chatteruser')
    const oldGroup = this.state.activeGroup;
    $.ajax({
       url: `group/api/getgroup/${activeGroup._id}`,
       type: "GET",
       headers: {
          "authorization": token
       }
    }).done((group) => {
      this.setState({ activeGroup: group, messages: group.messages });
      iosocket.emit('enter', {user: this.state.currentUser, group, oldGroup});

    }).fail((err) => {
      console.log('error', err)
    });
  }

  //sets a username, updates the state
  setUserName(user) {
    const { users } = this.state;
    const currentUser = { id: user._id, username: user.username }
    users.push(currentUser)
    this.setState({ currentUser, users: uniqBy(users, 'id') });
  }

  // posts a new message to the proper group.
  addMessage(newMessage, activeGroup) {
    const { messages, users } = this.state;

    let createdAt = new Date;
    createdAt = fecha.format(createdAt, 'HH:mm:ss MM/DD/YYYY');

    const author = this.state.currentUser;
    const messageObject = { body: newMessage, createdAt, author };
    const token = localStorage.getItem('chatteruser')

    $.ajax({
       url: `group/api/newmessage/${activeGroup._id}`,
       type: "POST",
       headers: {
          "authorization": token
       },
       data: {data: JSON.stringify(messageObject)},
    })
    .done((changedMessages) => {
      //updates state for live updates
      this.setState({ messages: changedMessages });
    })
    .fail((err) => {
      console.log('error', err)
    });

    // emit the new message to all people in the active group
    iosocket.emit('message', {messageObject, activeGroup})
  }

  // clears a users localstorage of their chatter token
  signOut() {
    localStorage.clear('chatteruser');
    if (this.state.activeGroup) {
      iosocket.emit('userleft', {user: this.state.currentUser, group: this.state.activeGroup});
    }
    this.setState({currentUser: null});
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
                deleteGroup={this.deleteGroup.bind(this)}
                editGroup={this.editGroup.bind(this)}
                setGroup={this.setGroup.bind(this)}
              />
              <UserSection
                {...this.state}
              />
            </div>
            <MessageSection
              {...this.state}
              signOut={this.signOut.bind(this)}
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
