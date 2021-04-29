import React, { useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import {
  Modal,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { setLocale } from 'yup';

import ServerContext from '../../contexts/serverContext.js';
import { closeModal } from '../../slices/modal.js';

const AddChannel = ({ modalInfo }) => {
  const { isOpened } = modalInfo;
  const { createChannel } = useContext(ServerContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const inputField = useRef(null);

  setLocale({
    mixed: {
      required: 'errors.required',
    },
  });

  const AddChannelSchema = Yup.object().shape({
    chatName: Yup.string()
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
      onEntered={() => inputField.current.focus()}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modal.addChannel')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{ chatName: '' }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={AddChannelSchema}
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
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="chatName">
                <FormControl
                  name="chatName"
                  aria-label="add channel"
                  className="mb-2"
                  value={values.chatName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  ref={inputField}
                  isInvalid={errors.chatName && touched.chatName}
                  data-testid="add-channel"
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

export default AddChannel;
