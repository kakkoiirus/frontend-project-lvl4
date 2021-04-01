import React from 'react';
import { useSelector } from 'react-redux';

import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';

export default () => {
  const { type, extra } = useSelector((state) => state.modal);

  const mapping = {
    AddChannel: <AddChannelModal />,
    RenameChannel: <RenameChannelModal />,
    RemoveChannel: <RemoveChannelModal extra={extra} />,
  };

  return (
    <>
      {type && mapping[type]}
    </>
  );
};
