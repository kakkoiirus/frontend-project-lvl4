import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

import { setCurrentChannel } from '../slices/channels.js';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsData);
  const dispatch = useDispatch();

  const onChannelClick = (id) => async () => {
    dispatch(setCurrentChannel({ id }));
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
        <Dropdown.Item onClick={onChannelClick(id)}>Remove</Dropdown.Item>
        <Dropdown.Item onClick={onChannelClick(id)}>Rename</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>
          Channels
        </span>
        <Button
          className="ml-auto p-0"
          variant="link"
          onClick={onChannelClick}
        >
          +
        </Button>
      </div>
      <Nav className="flex-column" fill variant="pills">
        <Nav.Item>
          {channels.map(({ id, name, removable }) => (
            !removable ? getNonRemovableNav(id, name) : getRemovableNav(id, name)
          ))}
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Channels;