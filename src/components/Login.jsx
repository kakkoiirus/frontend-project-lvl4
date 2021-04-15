import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
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

  return (
    <Container fluid>
      <Row className="row justify-content-center pt-5">
        <Col sm={4}>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
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
                  <Form.Label>Ваш ник</Form.Label>
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    isInvalid={!isValid}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    isInvalid={!isValid}
                  />
                  <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={isSubmitting}
                >
                  Войти
                </Button>
                <div className="d-flex flex-column align-items-center">
                  <span className="small mb-2">Нет аккаунта?</span>
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
