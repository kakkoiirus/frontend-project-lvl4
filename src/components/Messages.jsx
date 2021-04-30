import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ChatBox from './ChatBox.jsx';

const Messages = () => {
  const { messages } = useSelector((state) => state.messagesData);
  const channel = useSelector((state) => state.channelsData);

  const messagesRef = useRef();

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView(false);
    }
  }, [messages]);

  return (
    <>
      <div
        className="chat-messages overflow-auto mb-3"
      >
        {messages
          .filter((m) => m.channelId === channel.currentChannelId)
          .map((m, index, arr) => (
            <div
              key={m.id}
              className="text-break"
              ref={arr.length - 1 === index ? messagesRef : null}
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
