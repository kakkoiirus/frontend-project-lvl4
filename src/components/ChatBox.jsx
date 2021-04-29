import React, { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import { Formik } from 'formik';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';

import ServerContext from '../contexts/serverContext.js';
import useAuth from '../hooks/index.jsx';

setLocale({
  mixed: {
    required: 'errors.required',
  },
});

const MessageSchema = Yup.object().shape({
  body: Yup.string()
    .required()
    .trim(),
});

const ChatBox = ({ channel }) => {
  const { sendMessage } = useContext(ServerContext);
  const { t } = useTranslation();
  const { user } = useAuth();
  const { currentChannelId } = channel;
  const inputText = useRef(null);

  return (
    <div className="mt-auto">
      <Formik
        initialValues={{ body: '' }}
        validateOnBlur={false}
        validationSchema={MessageSchema}
        onSubmit={({ body }, { resetForm, setSubmitting }) => {
          const message = { body, channelId: currentChannelId, username: user.username };
          sendMessage(message, (res) => {
            if (res.status === 'ok') {
              resetForm();
              inputText.current.focus();
            }
            setSubmitting(false);
          });
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <FormControl
                autoFocus
                aria-label="body"
                name="body"
                value={values.body}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                isInvalid={errors.body && touched.body}
                data-testid="new-message"
                ref={inputText}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit" disabled={isSubmitting}>{t('controls.submit')}</Button>
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">{errors.body && touched.body ? t(errors.body) : null}</Form.Control.Feedback>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChatBox;
