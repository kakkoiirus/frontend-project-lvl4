import React from 'react';

const Channels = (props) => {
  const { channels } = props;

  return (
    <div>
      <ul>
        {channels.map(({ id, name }) => <li key={id}>{name}</li>)}
      </ul>
    </div>
  );
};

export default Channels;
