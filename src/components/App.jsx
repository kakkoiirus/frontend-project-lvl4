import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Modal from './Modal';
import Channels from './Channels';
import Messages from './Messages';

const App = () => (
  <Row className="h-100 pb-3">
    <Modal />
    <Col className="col-3 border-right">
      <Channels />
    </Col>
    <Col className="col h-100">
      <Messages />
    </Col>
  </Row>
);

export default App;
