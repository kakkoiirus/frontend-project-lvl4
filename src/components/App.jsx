import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';

const App = () => {
  console.log('App');

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar className="mb-3" bg="light" expand="lg">
          <Navbar.Brand className="mr-auto" href="/">
            Hexlet Chat
          </Navbar.Brand>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Chat />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
