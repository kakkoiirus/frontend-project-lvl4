import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Modal,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';
import _ from 'lodash';
import axios from 'axios';

import { closeModal } from '../slices/modal';
import routes from '../routes';

const RenameChannelModal = () => {
  const { isOpened, extra: { channelId } } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channelsData);
  const inputField = useRef(null);
  const dispatch = useDispatch();

  const channel = _.find(channels, (c) => c.id === channelId);

  const onClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = async ({ chatName }, { setSubmitting }) => {
    const path = routes.channelPath(channelId);
    const data = { attributes: { name: chatName } };
    try {
      const res = await axios.patch(path, { data });
      setSubmitting(false);
      if (res.status !== 200) {
        throw Error(res.status);
      }
      onClose();
    } catch (err) {
      setSubmitting(false);
      throw Error(err);
    }
  };

  return (
    <Modal
      show={isOpened}
      onHide={onClose}
      onEntered={() => inputField.current.select()}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Rename channel
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{ chatName: channel.name }}
          onSubmit={onSubmit}
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
                autoFocus
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

export default RenameChannelModal;
