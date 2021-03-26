import React from 'react';
import { useSelector } from 'react-redux';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import axios from 'axios';

import UserContext from '../user-context';
import routes from '../routes';

const ChatBox = () => {
  const { currentChannelId } = useSelector((state) => state.channelsData);
  return (
    <UserContext.Consumer>
      {(username) => (
        <Formik
          initialValues={{ message: '' }}
          onSubmit={async ({ message }, { setSubmitting, resetForm }) => {
            const path = routes.channelMessagesPath(currentChannelId);
            try {
              const res = await axios.post(path, { data: { attributes: { message, username } } });
              if (res.status === 201) {
                resetForm();
              }
            } catch (err) {
              console.log(err);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="message" />
              <ErrorMessage name="message" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </UserContext.Consumer>
  );
};

export default ChatBox;
