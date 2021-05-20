import React, { useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import {
  Modal,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';
import _ from 'lodash';
import * as Yup from 'yup';

import ServerContext from '../../contexts/serverContext.js';
import { closeModal } from '../../slices/modal.js';

const RenameChannel = ({ modalInfo }) => {
  const { isOpened, extra: { channelId } } = modalInfo;
  const { channels } = useSelector((state) => state.channelsData);
  const { renameChannel } = useContext(ServerContext);
  const inputField = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channel = _.find(channels, (c) => c.id === channelId);
  const channelsNames = channels
    .filter((item) => item.id !== channelId)
    .map((item) => item.name);

  const RenameChannelSchema = Yup.object().shape({
    chatName: Yup.string()
      .min(3, 'errors.chatNameLength')
      .max(20, 'errors.chatNameLength')
      .notOneOf(channelsNames, 'errors.channelAlreadyExist')
      .required()
      .trim(),
  });

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
          {t('modal.renameChannel')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{ chatName: channel.name }}
          validationSchema={RenameChannelSchema}
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
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="chatName">
                <FormControl
                  autoFocus
                  name="chatName"
                  className="mb-2"
                  value={values.chatName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  ref={inputField}
                  isInvalid={errors.chatName && touched.chatName}
                  data-testid="rename-channel"
                />
                <Form.Control.Feedback type="invalid">{errors.chatName && touched.chatName ? t(errors.chatName) : null}</Form.Control.Feedback>
                <div className="d-flex justify-content-end">
                  <Button
                    className="mr-2"
                    variant="secondary"
                    onClick={onClose}
                  >
                    {t('controls.cancel')}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {t('controls.submit')}
                  </Button>
                </div>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
