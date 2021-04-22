import React, { useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import {
  Modal,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';

import ServerContext from '../../contexts/serverContext.js';
import { closeModal } from '../../slices/modal.js';

const AddChannel = ({ modalInfo }) => {
  const { isOpened } = modalInfo;
  const { createChannel } = useContext(ServerContext);
  const dispatch = useDispatch();

  const inputField = useRef(null);

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      show={isOpened}
      onHide={onClose}
      onEntered={() => inputField.current.focus()}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Add channel
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{ chatName: '' }}
          onSubmit={({ chatName }, { setSubmitting }) => {
            createChannel(chatName, (res) => {
              if (res.status === 'ok') {
                setSubmitting(false);
                onClose();
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
              <FormControl
                type="text"
                name="chatName"
                className="mb-2"
                value={values.chatName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                ref={inputField}
              />
              <div className="d-flex justify-content-end">
                <Button
                  className="mr-2"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
