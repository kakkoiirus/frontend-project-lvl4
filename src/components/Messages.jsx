import React from 'react';
import { useSelector } from 'react-redux';

import ChatBox from './ChatBox.jsx';

const Messages = () => {
  const { messages } = useSelector((state) => state.messagesData);
  const channel = useSelector((state) => state.channelsData);

  return (
    <>
      <div className="chat-messages overflow-auto mb-3">
        {messages
          .filter((m) => m.channelId === channel.currentChannelId)
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
      <ChatBox channel={channel} />
    </>
  );
};

export default Messages;
