import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const { messages } = useSelector((state) => state.messagesData);
  const { currentChannelId } = useSelector((state) => state.channelsData);

  return (
    <div className="chat-messages overflow-auto mb-3">
      {messages
        .filter((m) => m.channelId === currentChannelId)
        .map((m) => (
          <div
            key={m.id}
            className="text-break"
          >
            <b>
              {m.username}
            </b>
            {': '}
            {m.message}
          </div>
        ))}
    </div>
  );
};

export default Messages;
