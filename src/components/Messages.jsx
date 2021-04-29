import React from 'react';

import ChatBox from './ChatBox.jsx';

const Messages = ({ messages, channels }) => (
  <>
    <div className="chat-messages overflow-auto mb-3">
      {messages
        .filter((m) => m.channelId === channels.currentChannelId)
        .map((m) => (
          <div
            key={m.id}
            className="text-break"
          >
            <b>
              {m.username}
            </b>
            {': '}
            {m.body}
          </div>
        ))}
    </div>
    <ChatBox channels={channels} />
  </>
);

export default Messages;
