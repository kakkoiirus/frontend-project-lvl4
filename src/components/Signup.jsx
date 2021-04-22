import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Col,
  Container,
  Form,
  Row,
  Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import useAuth from '../hooks/index.jsx';

const Signup = () => {
  const [authError, setAuthError] = useState(null);
  const history = useHistory();
  const { t } = useTranslation();
  const inputRef = useRef();
  const auth = useAuth();

  setLocale({
    mixed: {
      required: 'signup.errors.required',
    },
  });

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'signup.errors.usernameLength')
      .max(20, 'signup.errors.usernameLength')
      .required()
      .trim(),
    password: Yup.string()
      .min(6, 'signup.errors.passwordLength')
      .required()
      .trim(),
    confirmPassword: Yup.string()
      .min(6, 'signup.errors.passwordLength')
      .oneOf([Yup.ref('password')], 'signup.errors.passwordNotEqual')
      .required()
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
            initialValues={{
              username: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={async ({ username, password }, { setSubmitting }) => {
              try {
                const res = await axios.post(
                  '/api/v1/signup',
                  { username, password },
                );

                const { token } = res.data;
                auth.logIn({ token, username });

                setSubmitting(false);
                history.push('/');
              } catch (err) {
                setSubmitting(false);
                if (err.response.status === 409) {
                  setAuthError('signup.errors.alreadyExist');
                  inputRef.current.select();
                  return;
                }

                throw err;
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form className="p-3" onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>{t('signup.username')}</Form.Label>
                  <Form.Control
                    placeholder={t('signup.placeholders.username')}
                    name="username"
                    autoComplete="username"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    isInvalid={(errors.username && touched.username) || authError}
                    ref={inputRef}
                  />
                  <Form.Control.Feedback type="invalid">{errors.username && touched.username ? t(errors.username) : null}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>{t('signup.password')}</Form.Label>
                  <Form.Control
                    placeholder={t('signup.placeholders.password')}
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    isInvalid={(errors.password && touched.password) || authError}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password && touched.password ? t(errors.password) : null}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>{t('signup.confirmPassword')}</Form.Label>
                  <Form.Control
                    placeholder={t('signup.placeholders.confirmPassword')}
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    isInvalid={(errors.confirmPassword && touched.confirmPassword) || authError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {
                      (errors.confirmPassword && touched.confirmPassword) || authError
                        ? t(authError) || t(errors.confirmPassword)
                        : null
                    }
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={isSubmitting}
                >
                  {t('signup.submit')}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
