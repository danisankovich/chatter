import React, {PropTypes} from 'react';

import Message from './Message.jsx';

const MessageCollection = (props) => {
  // because messages do not have their own unique id keys, create them for better tracker
  let messageId = 0;
  return (
    <div>
      <button className="btn btn-warning signout-button" onClick={props.signOut.bind(this)}>Sign Out</button>
      <ul className='messages'>
        {
          props.messages.map(message =>
            <Message
              key={messageId++}
              message={message}
              currentUser={props.currentUser}
            />
          )
        }
      </ul>
    </div>
  )
}

MessageCollection.propTypes = {
  messages: PropTypes.array.isRequired,
  signOut: PropTypes.func.isRequired,
}

export default MessageCollection;
