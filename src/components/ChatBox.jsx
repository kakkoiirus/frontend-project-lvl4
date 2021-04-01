import React, { useRef } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';

import UserContext from '../user-context';
import routes from '../routes';

const ChatBox = ({ activeChannel }) => {
  const inputText = useRef(null);

  return (
    <UserContext.Consumer>
      {(username) => (
        <Formik
          initialValues={{ message: '' }}
          onSubmit={async ({ message }, { setSubmitting, resetForm }) => {
            const path = routes.channelMessagesPath(activeChannel);
            try {
              const res = await axios.post(path, { data: { attributes: { message, username } } });
              if (res.status === 201) {
                resetForm();
              }
            } catch (err) {
              console.log(err);
            }
            setSubmitting(false);
            inputText.current.focus();
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
                  name="message"
                  value={values.message}
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
      )}
    </UserContext.Consumer>
  );
};

export default ChatBox;
