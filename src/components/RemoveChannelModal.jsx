import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Button,
} from 'react-bootstrap';
import axios from 'axios';

import { closeModal } from '../slices/modal';
import routes from '../routes';

const RemoveChannelModal = () => {
  const { isOpened, extra: { channelId } } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeModal());
  };

  const onRemoveClick = (id) => async () => {
    const path = routes.channelPath(id);
    try {
      const res = await axios.delete(path);
      if (res.status !== 204) {
        throw Error(res.status);
      }
      onClose();
    } catch (err) {
      throw Error(err);
    }
  };

  return (
    <Modal
      show={isOpened}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Remove channel
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure?
        <div className="d-flex justify-content-between">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onRemoveClick(channelId)}
          >
            Confirm
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
