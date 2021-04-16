import React, { useRef } from 'react';
import { Formik } from 'formik';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';

const ChatBox = () => {
  const inputText = useRef(null);

  return (
    <div className="mt-auto">
      <Formik
        initialValues={{ message: '' }}
        onSubmit={async ({ message }, { setSubmitting }) => {
          console.log(message);
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
    </div>
  );
};

export default ChatBox;
