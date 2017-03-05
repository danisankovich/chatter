import React, {Component, PropTypes} from 'react';

class Message extends Component {

  render() {
    const { message } = this.props;

    return (
      <li className="message">
        <div className='author'>
          <strong>{message.author.username}</strong>
          <i className='timestamp'>{message.createdAt}</i>
        </div>
        <div className='body'>{message.body}</div>
      </li>
    )
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
}

export default Message;
