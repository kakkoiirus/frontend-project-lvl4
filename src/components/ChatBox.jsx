import React, { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';

import ServerContext from '../contexts/serverContext.js';
import useAuth from '../hooks/index.jsx';

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
        onSubmit={async ({ body }, { resetForm, setSubmitting }) => {
          const message = { body, channelId: currentChannelId, username: user.username };
          const res = await sendMessage(message);
          if (res === 'ok') {
            resetForm();
            inputText.current.focus();
          }
          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleSubmit,
          handleBlur,
          values,
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
                ref={inputText}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit" disabled={isSubmitting}>{t('controls.submit')}</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChatBox;
