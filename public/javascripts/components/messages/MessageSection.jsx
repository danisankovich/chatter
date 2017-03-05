import React, {Component, PropTypes} from 'react';
import MessageForm from './MessageForm.jsx';
import MessageCollection from './MessageCollection.jsx';

class MessageSection extends Component {

  render() {
    const { activeGroup } = this.props;

    return (
      <div className="messages-container panel panel-default">
        <div className="panel-heading"><strong>{activeGroup.name}</strong></div>
        <div className="panel-body messages">
          <MessageCollection {...this.props} />
          <MessageForm {...this.props} />
        </div>
      </div>
    )
  }
}

MessageSection.propTypes = {
  messages: PropTypes.array.isRequired,
  activeGroup: PropTypes.object.isRequired,
  addMessage: PropTypes.func.isRequired,
}

export default MessageSection;
