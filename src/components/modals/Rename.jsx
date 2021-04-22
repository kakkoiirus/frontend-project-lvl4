import React, { useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Modal,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';
import _ from 'lodash';

import ServerContext from '../../contexts/serverContext.js';
import { closeModal } from '../../slices/modal.js';

const RenameChannel = ({ modalInfo }) => {
  const { isOpened, extra: { channelId } } = modalInfo;
  const { channels } = useSelector((state) => state.channelsData);
  const { renameChannel } = useContext(ServerContext);
  const inputField = useRef(null);
  const dispatch = useDispatch();

  const channel = _.find(channels, (c) => c.id === channelId);

  const onClose = () => {
    dispatch(closeModal());
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
          onSubmit={({ chatName }, { setSubmitting }) => {
            renameChannel({ id: channelId, name: chatName }, (res) => {
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

export default RenameChannel;
