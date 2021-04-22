import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import authContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

import Nav from './Nav.jsx';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import Signup from './Signup.jsx';

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
          <Nav />
          <Switch>
            <PrivateRoute exact path="/">
              <Chat />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
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
};

export default App;
