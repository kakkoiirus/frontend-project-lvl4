import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const { messages } = useSelector((state) => state.messagesData);

  return messages.map((m) => (
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
  ));
};

export default Messages;
