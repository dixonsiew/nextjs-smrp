import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button, Modal } from 'react-bootstrap';

export const CalendarModal = ({ onCancelCb, onConfirm, selected, show }) => {
  const [value, onChange] = useState(() => {
    if (selected === '') {
      return new Date();
    }
    return selected;
  })

  useEffect(() => {
    if (selected !== '') {
      onChange(selected);
    }
  }, [selected, show])

  const onCancel = () => {
    onCancelCb();
  }

  const onSelect = () => {
    onConfirm(value);
  }

  return (
    <Modal
      show={show}
      onHide={() => onCancel()}
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Calendar</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Calendar onChange={onChange} value={value} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onSelect()}>Select</Button>
        <Button variant="outline-secondary" onClick={() => onCancel()}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CalendarModal;
