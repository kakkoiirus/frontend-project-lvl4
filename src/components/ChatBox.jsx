import React, { useRef } from 'react';
import { Formik } from 'formik';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';

import useAuth from '../hooks/index.jsx';

const ChatBox = ({ socket, channel }) => {
  const { user } = useAuth();
  const { currentChannelId } = channel;
  const inputText = useRef(null);

  return (
    <div className="mt-auto">
      <Formik
        initialValues={{ body: '' }}
        onSubmit={({ body }, { resetForm, setSubmitting }) => {
          setSubmitting(true);
          socket.emit('newMessage', { body, channelId: currentChannelId, username: user.username }, (res) => {
            if (res.status === 'ok') {
              resetForm();
              inputText.current.focus();
              setSubmitting(false);
              return;
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <FormControl
                autoFocus
                type="text"
                name="body"
                value={values.body}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                ref={inputText}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChatBox;
