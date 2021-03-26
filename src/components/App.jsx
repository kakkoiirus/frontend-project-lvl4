import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Channels from '../features/channels/Channels';
import Messages from './Messages';
import ChatBox from './ChatBox';

const App = () => (
  <Row className="h-100 pb-3">
    <Col className="col-3 border-right">
      <Channels />
    </Col>
    <Col className="col h-100">
      <div className="d-flex flex-column h-100">
        <Messages />
        <div className="mt-auto">
          <ChatBox />
        </div>
      </div>
    </Col>
  </Row>
);

export default App;
