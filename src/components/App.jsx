import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import authContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';

const AuthProvider = ({ children }) => {
  const data = localStorage.getItem('user');

  const user = data ? JSON.parse(data) : null;

  const isUserHasToken = user && user.token;

  const [loggedIn, setLoggedIn] = useState(isUserHasToken);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
      user,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      render={({ location }) => (auth.loggedIn
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

const App = () => {
  console.log('App');

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar className="mb-3" bg="light" expand="lg">
            <Navbar.Brand className="mr-auto" href="/">
              Hexlet Chat
            </Navbar.Brand>
          </Navbar>
          <Switch>
            <PrivateRoute exact path="/">
              <Chat />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
