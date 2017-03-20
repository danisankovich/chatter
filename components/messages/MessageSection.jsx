import React, {PropTypes} from 'react';
import MessageForm from './MessageForm.jsx';
import MessageCollection from './MessageCollection.jsx';

const MessageSection = (props) => {

  const { activeGroup } = props;

  return (
    <div className="messages-container panel panel-default">
      <div className="panel-heading">
        <strong>
          {activeGroup.name ? activeGroup.name : 'Select A Group From The Left'}
        </strong>
      </div>
      <div className="panel-body messages">
        <div className='scroll-groups'>
          <MessageCollection {...props} />
          <div className='message-form'>
            <MessageForm {...props} />
          </div>
        </div>
      </div>
    </div>
  )
}

MessageSection.propTypes = {
  messages: PropTypes.array.isRequired,
  activeGroup: PropTypes.object.isRequired,
  addMessage: PropTypes.func.isRequired,
}

export default MessageSection;
