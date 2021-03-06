import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Navbar, Button } from 'react-bootstrap';

import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const Nav = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const auth = useAuth();

  const onLogoutClick = () => {
    auth.logOut();
    history.push(routes.rootPath());
  };

  return (
    <Navbar className="mb-3" bg="light" expand="lg">
      <Navbar.Brand className="mr-auto" to={routes.rootPath()} as={Link}>
        Hexlet Chat
      </Navbar.Brand>
      {auth.loggedIn && (
        <Button
          variant="primary"
          onClick={onLogoutClick}
        >
          {t('controls.logout')}
        </Button>
      )}
    </Navbar>
  );
};

export default Nav;
