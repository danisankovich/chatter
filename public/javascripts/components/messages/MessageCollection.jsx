import React, {Component, PropTypes} from 'react';
import Message from './Message.jsx';

class MessageCollection extends Component {

  render() {
    return (
      <ul>
        {
          this.props.messages.map(message =>
            <Message
              key={message.id}
              message={message}
            />
          )
        }
      </ul>

    )
  }
}

MessageCollection.propTypes = {
  messages: PropTypes.array.isRequired,
}

export default MessageCollection;
