import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

import { setInitialState } from '../slices/channels.js';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const Chat = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsData);
  const { messages } = useSelector((state) => state.messagesData);

  useEffect(async () => {
    const authHeader = getAuthHeader();

    try {
      const res = await axios.get(
        '/api/v1/data',
        { headers: authHeader },
      );

      dispatch(setInitialState(res.data));
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  return (
    (channels && currentChannelId)
    && (
      <Row className="flex-grow-1 h-75 pb-3">
        <Channels channels={channels} currentChannelId={currentChannelId} />
        <Col className="h-100">
          <div className="d-flex flex-column h-100">
            <Messages messages={messages} channels={channels} />
          </div>
        </Col>
      </Row>
    )
  );
};

export default Chat;
