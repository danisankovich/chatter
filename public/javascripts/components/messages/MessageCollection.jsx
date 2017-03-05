import React, {Component, PropTypes} from 'react';

import Message from './Message.jsx';

class MessageCollection extends Component {
  render() {
    let messageId = 0;
    return (
      <div>
        <button className="btn btn-warning signout-button" onClick={this.props.signOut.bind(this)}>Sign Out</button>
        <ul className='messages'>
          {
            this.props.messages.map(message =>
              <Message
                key={messageId++}
                message={message}
                currentUser={this.props.currentUser}
              />
            )
          }
        </ul>
      </div>
    )
  }
}

MessageCollection.propTypes = {
  messages: PropTypes.array.isRequired,
}

export default MessageCollection;
