import React from 'react';
import { useSelector } from 'react-redux';
import { Badge, Button, Nav } from 'react-bootstrap';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsData);

  return (
    <>
      <div className="d-flex mb-2">
        <Badge>
          Channels
        </Badge>
      </div>
      <Nav className="flex-column" fill variant="pills">
        <Nav.Item>
          {channels.map(({ id, name }) => (
            <Nav.Link
              key={id}
              as={Button}
              variant={currentChannelId === id ? 'primary' : 'light'}
              className="btn-block mb-2 text-left"
            >
              {name}
            </Nav.Link>
          ))}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Channels;
