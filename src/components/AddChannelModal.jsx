import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Modal,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';

import { addNewChannel } from '../slices/channels';
import { closeModal } from '../slices/modal';

const AddChannel = () => {
  const { isOpened } = useSelector((state) => state.modal);
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
          onSubmit={async ({ chatName }, { setSubmitting }) => {
            const data = { attributes: { name: chatName } };
            await dispatch(addNewChannel(data));
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
