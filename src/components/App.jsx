import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import authContext from '../contexts/authContext.js';
import useAuth from '../hooks/index.jsx';

import Nav from './Nav.jsx';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import Signup from './Signup.jsx';

import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const data = localStorage.getItem('user');

  const user = data ? JSON.parse(data) : null;

  const isUserHasToken = user && user.token;

  const [loggedIn, setLoggedIn] = useState(isUserHasToken);

  const logIn = ({ token, username }) => {
    localStorage.setItem('user', JSON.stringify({ token, username }));
    setLoggedIn(true);
  };

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
        : <Redirect to={{ pathname: routes.loginPath(), state: { from: location } }} />)}
    />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Nav />
        <Switch>
          <PrivateRoute exact path={routes.rootPath()}>
            <Chat />
          </PrivateRoute>
          <Route path={routes.loginPath()}>
            <Login />
          </Route>
          <Route path={routes.signupPath()}>
            <Signup />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
