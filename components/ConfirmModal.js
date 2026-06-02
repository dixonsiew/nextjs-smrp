import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const ConfirmModal = ({ onCancel, onConfirm, title, message, show }) => {
  const onNo = () => {
    onCancel();
  }

  const onYes = () => {
    onConfirm();
  }

  return (
    <Modal
      backdrop="static"
      show={show}
      onHide={() => onNo()}
      centered
      aria-labelledby="StaticBackdropExampleLabel"
    >
      <Modal.Header closeButton>
        <Modal.Title id="StaticBackdropExampleLabel">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => onYes()}>Yes</Button>
        <Button variant="outline-secondary" onClick={() => onNo()}>No</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal;
