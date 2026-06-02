import React, { useState } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';

export const LookupModal = ({ onCancelCb, onConfirm, title, items, selected, show }) => {
  const [selectedItem, setSelectedItem] = useState(null)

  const onCancel = () => {
    onCancelCb()
  }

  const onSelectDbl = (item) => {
    onSelectItem(item)
    onSelect()
  }

  const onSelect = () => {
    onConfirm(selectedItem)
  }

  const onSelectItem = (item) => {
    setSelectedItem(item)
  }

  return (
    <Modal
      show={show}
      onHide={() => onCancel()}
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="StaticBackdropExampleLabel">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <ListGroup>
          {
            items.map((item, index) => (
              <ListGroup.Item
                key={index}
                active={item.desc === selectedItem?.desc || item.desc === selected}
                onClick={() => onSelectItem(item)}
                onDoubleClick={() => onSelectDbl(item)}
                className="cursor-pointer"
              >
                {item.desc}
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onSelect()}>Select</Button>
        <Button variant="outline-secondary" onClick={() => onCancel()}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LookupModal;
