import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

import { setCurrentChannel } from '../slices/channels.js';
import { openModal } from '../slices/modal.js';

import getModal from './modals/index.js';

const renderModal = (modalInfo) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} />;
};

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsData);
  const modalInfo = useSelector((state) => state.modalData);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onChannelClick = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };

  const onAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  const onRemoveChannel = (channelId) => () => {
    dispatch(openModal({ type: 'removeChannel', extra: { channelId } }));
  };

  const onRenameChannel = (channelId) => () => {
    dispatch(openModal({ type: 'renameChannel', extra: { channelId } }));
  };

  const getNonRemovableNav = (id, name) => (
    <Nav.Link
      key={id}
      as={Button}
      variant={currentChannelId === id ? 'primary' : 'light'}
      className="btn-block mb-2 text-left"
      onClick={onChannelClick(id)}
    >
      {name}
    </Nav.Link>
  );

  const getRemovableNav = (id, name) => (
    <Dropdown
      as={ButtonGroup}
      key={id}
      className="d-flex mb-2"
    >
      <Button
        as={Button}
        variant={currentChannelId === id ? 'primary' : 'light'}
        className="flex-grow-1 text-left"
        onClick={onChannelClick(id)}
      >
        {name}
      </Button>
      <Dropdown.Toggle
        split
        variant={currentChannelId === id ? 'primary' : 'light'}
        className="flex-grow-0"
      />
      <Dropdown.Menu>
        <Dropdown.Item onClick={onRemoveChannel(id)}>{t('controls.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={onRenameChannel(id)}>{t('controls.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>
          {t('channels')}
        </span>
        <Button
          className="ml-auto p-0"
          variant="link"
          onClick={onAddChannel}
        >
          +
        </Button>
      </div>
      <Nav className="flex-column overflow-auto" fill variant="pills">
        <Nav.Item>
          {channels.map(({ id, name, removable }) => (
            !removable ? getNonRemovableNav(id, name) : getRemovableNav(id, name)
          ))}
        </Nav.Item>
      </Nav>
      {renderModal(modalInfo)}
    </div>
  );
};

export default Channels;
