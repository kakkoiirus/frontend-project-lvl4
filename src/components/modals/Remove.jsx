import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal,
  Button,
} from 'react-bootstrap';

import ServerContext from '../../contexts/serverContext.js';
import { closeModal } from '../../slices/modal.js';

const RemoveChannel = ({ modalInfo }) => {
  const { isOpened, extra: { channelId } } = modalInfo;
  const { removeChannel } = useContext(ServerContext);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeModal());
  };

  const onRemoveClick = (id) => () => {
    removeChannel(id, (res) => {
      if (res.status === 'ok') {
        onClose();
      }
    });
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

export default RemoveChannel;
