import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

import { setInitialState } from '../slices/channels.js';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import ChatBox from './ChatBox.jsx';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    const authHeader = getAuthHeader();

    try {
      const res = await axios.get(
        '/api/v1/data',
        { headers: authHeader },
      );

      const { channels, currentChannelId, messages } = res.data;

      dispatch(setInitialState({ channels, currentChannelId, messages }));
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Row className="flex-grow-1 h-75 pb-3">
      <Channels />
      <Col className="h-100">
        <div className="d-flex flex-column h-100">
          <Messages />
          <ChatBox />
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
