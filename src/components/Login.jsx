import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useAuth from '../hooks/index.jsx';

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const history = useHistory();
  const auth = useAuth();
  const { t } = useTranslation();

  const inputRef = useRef();

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .trim(),
    password: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .trim(),
  });

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Container fluid>
      <Row className="row justify-content-center pt-5">
        <Col sm={4}>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async ({ username, password }, { setSubmitting }) => {
              try {
                const res = await axios.post(
                  '/api/v1/login',
                  { username, password },
                );

                const { token } = res.data;
                localStorage.setItem('user', JSON.stringify({ token, username }));
                auth.logIn();
                setSubmitting(false);
                history.push('/');
              } catch (err) {
                setSubmitting(false);
                if (err.response.status === 401) {
                  setAuthFailed(true);
                  inputRef.current.select();
                  return;
                }

                throw err;
              }
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
            }) => (
              <Form className="p-3" onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>{t('login.username')}</Form.Label>
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    isInvalid={!isValid || authFailed}
                    ref={inputRef}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>{t('login.password')}</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    isInvalid={!isValid || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">{t('login.error')}</Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={isSubmitting}
                >
                  {t('login.signin')}
                </Button>
                <div className="d-flex flex-column align-items-center">
                  <span className="small mb-2">{t('login.noprofile')}</span>
                  <a href="/">{t('login.signup')}</a>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
