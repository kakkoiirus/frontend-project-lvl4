import React from 'react';
import { useSelector } from 'react-redux';
import ChatBox from './ChatBox';

const Messages = () => {
  const { messages } = useSelector((state) => state.messagesData);
  const { currentChannelId } = useSelector((state) => state.channelsData);

  return (
    <div className="d-flex flex-column h-100">
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
      <div className="mt-auto">
        <ChatBox activeChannel={currentChannelId} />
      </div>
    </div>
  );
};

export default Messages;
